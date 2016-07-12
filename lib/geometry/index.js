/**
 * @module lib/geometry
 */
import * as angle from './angle.js';
import * as spherical from 'lib/spherical-geometry';

spherical.distanceBetween = spherical.computeDistanceBetween;
spherical.offset = spherical.computeOffset;
spherical.interpolateBy = (from, to, length) => spherical.interpolate(
	from, to, length / spherical.distanceBetween(from, to)
);
spherical.radius = spherical.EARTH_RADIUS;

export {angle, spherical};