/**
 * Position used for GeoJSON. A position can have many keys.
 * If given an object instead of an array, the first and second
 * keys are set from the x and y properties.
 * Position is an iterable object, and as a result can be turned into an array
 * by using Array.from
 * @alias module:lib/geojson.Position
 */
export default class Position {
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