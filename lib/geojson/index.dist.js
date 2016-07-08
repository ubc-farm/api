/**
 * @module lib/geojson
 * @typicalname GeoJSON
 */

exports.Feature = class Feature {
	get type() {return 'Feature'}
	constructor(geometry, properties, id) {
		Object.assign(this, {geometry, properties});
		if (id) this.id = id;
	}

	toJSON() {
		const {type, geometry, properties, id} = this;
		let json = {type, geometry, properties};
		if (id) json.id = id;
		return json;
	}
}

exports.FeatureCollection = class FeatureCollection {
	get type() {return 'FeatureCollection'}
	constructor(features) {
		this.features = features;
	}

	toJSON() {
		const {type, features} = this;
		return {type, features}
	}
} 

exports.Position = class Position {
	/**
	 * @param {Array|Object} value
	 * @param {number} value[] - axis of coordinate
	 * @param {number} value.x - set as value[0]
	 * @param {number} value.y - set as value[1]
	 */
	constructor(value) {
		if (Array.isArray(value))
			for (let key in value) this[key] = value[key];
		else if ('x' in value && 'y' in value) {
			const {x, y} = value;
			Object.assign(this, {0: x, 1: y});
		} else {
			throw Error('Position must be called with either an array or an object with properties x and y');
		}
	}

	/** Similar to Promise.resolve(), converts value into a Position */
	static from(value) {
		if (value instanceof Position) return value;
		else return new Position(value);
	}

	/**
	 * Converts Google Maps API LatLng to Position
	 * @param {google.maps.LatLng} latlng
	 * @returns {Position}
	 */
	static fromGoogle(latlng) {
		return new Position([latlng.lng(), latlng.lat()]);
	}

	/** For JSON.stringify serialization */
	toJSON() {
		return Array.from(this);
	}

	/** 
	 * Generator function to get values from this Position.
	 * @returns {Generator}
	 */
	* values() {
		let i = 0;
		while (true) {
			if (i in this) yield this[i];
			else break;
			i++;
		}
	}

	/** Interator protocolor function */
	[Symbol.iterator]() {return this.values()}

	//aliases
	get lat() {return this[1]}
	get lng() {return this[0]}
	get x() {return this[0]}
	get y() {return this[1]}
}

class Geometry {
	toJSON() {
		const {type, coordinates} = this;
		return {type, coordinates};
	}
	
	static parse(geojson) {
		return Object.assign(new this(), geojson);
	}

	/**
	 * Similar to Promise.resolve(): converts the value into a Geometry if it
	 * isn't one already.
	 * @param {Geometry|*} value
	 */
	static from(value) {
		if (value instanceof this) return value;
		else return new this(value);
	}
}

/**
 * A string of positions that forms a line
 * @extends Geometry
 */
exports.LineString = class LineString extends Geometry {
	get type() {return 'LineString';}

	/** @param {Position[]} positions */
	constructor(positions) {
		super();
		/** @type {Position[]} */
		this.coordinates = positions.map(Position.from);
	}
}

/**
 * Polygon coordinates contains LineStrings where the last point is equal to
 * the first point. If multiple lines are specified, the first will be the
 * exterior ring and the others will be holes in the polygon.
 * @extends Geometry
 */
exports.Polygon = class Polygon extends Geometry {
	get type() {return 'Polygon';}

	/** @param {...LineString} lines */
	constructor(...lines) {
		super();
		/** @type {Position[][]} */
		this.coordinates = lines.map(line => new LineString(line).coordinates);
	}

	/** Converts value to a Polygon */
	static from(value) {
		if (value instanceof Polygon) return value;
		else if (Array.isArray(value)) {
			return new Polygon(value);
		}
		else if (value.type && value.type == 'Polygon') {
			return new Polygon(value.coordinates);
		} 
	}

	/**
	 * Converts Google Maps API LatLng to Position
	 * @param {google.maps.Polygon} polygon
	 * @returns {Polygon}
	 */
	static fromGoogle(polygon) {
		return new Polygon(
			...polygon.getPaths().getArray().map(path => {
				let p = path.getArray().map(Position.fromGoogle);
				p.push(p[0]);
				return p;
			})
		);
	}
}