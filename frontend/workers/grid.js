import register from 'worker/promise/register.js';
import Field from 'geo/field/field.js';
import Grid from 'geo/grid/grid.js';

/**
 * Build a field and return its grid
 * @param {Object} msg
 * @param {string} msg.name
 * @param {Coordinate[]} msg.path of field
 * @param {Object} msg.gridSpec
 * @param {number} msg.gridSpec.width - base width of grid
 * @param {number} msg.gridSpec.height - base height of grid
 * @param {number[][]} msg.gridSpec.widthSpecific - specific widths
 * @param {number[]} msg.gridSpec.widthSpecific[] - key and width
 * @param {number[][]} msg.gridSpec.heightSpecific - specific heights
 * @param {number[]} msg.gridSpec.heightSpecific[] - key and height
 * @param {Coordinate[]} [msg.gridSpec.alignment]
 */
register(msg => {
	let field = new Field(msg.path, msg.name, 
		new Grid(msg.gridSpec.width, msg.gridSpec.height))
	
	if (msg.gridSpec.alignment) {
		field.grid.setAlignment(msg.gridSpec.alignment);
	}
	
	for (let [key, width] of msg.gridSpec.widthSpecific) {
		field.grid.width.set(key, width);
	}
	
	for (let [key, width] of msg.gridSpec.heightSpecific) {
		field.grid.height.set(key, width);
	}
	
	return field.grid.fill().map(cell => {
		return cell.path.map(coord => {
			return {x: coord.x, y: coord.y};
		});
	});
})