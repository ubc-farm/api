import Field from 'geo/field/field.js';
import Grid from 'geo/grid/grid.js'

function buildGrid({polygon, name}) {
	let field = new Field(polygon, name, new Grid());
}