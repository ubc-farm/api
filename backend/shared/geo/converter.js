import {geom} from 'jsts';

/** @module shared/geo/converter */

/**
 * Converts the provided JSON cell into a JSTS Polygon
 * @deprecated
 * @param {Coordinate[]} cell - the cell's path
 * @param {Coordinate} cell[] - a point on the path of the cell
 * @param {number} cell[].x
 * @param {number} cell[].y
 * @param {geom.GeometryFactory} [factory]
 * @returns {geom.Polygon}
 */
export function convertPolygon(cell, factory=new geom.GeometryFactory()) {
	const path = cell.map(point => new geom.Coordinate(point.x, point.y));
	return new geom.Polygon(factory.createLinearRing(path), [], factory);
}