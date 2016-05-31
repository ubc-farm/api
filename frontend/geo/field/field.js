import jsts from 'jsts';

export default class Field extends jsts.geom.Polygon {
	/**
	 * @param {Coordinate[]} path
	 * @param {string} name
	 * @param {Grid} grid
	 */
	constructor(path, name = '', grid) {
		this.name = name;
		this.grid = grid;
		
		let factory = new jsts.geom.GeometryFactory();
		super(factory.createLinearRing(path), [], factory);
		
		this.grid.setAlignment([path[0], path[1]]);
		this.grid.container = this;	
	}
	
	change(data) {
		
	}
	
	userChanged(data) {
		switch(data.id) {
			case 'grid':
				if (data.width != null) this.grid.width.base = data.width;
				if (data.height != null) this.grid.height.base = data.height;
				if (data.clear === true) {
					this.grid.width.clear();
					this.grid.height.clear();
				}
				if (data.mapWidth != null) {
					data.mapWidth.forEach((value, key) => this.grid.width.set(key, value))
				}
				if (data.mapHeight != null) {
					data.mapHeight
						.forEach((value, key) => this.grid.height.set(key, value));
				}
				//don't break, need to re-fill grid like in path
			case 'path':
				change({
					id: 'grid',
					cells: this.grid.fill()
				}); 
		}
	}
}