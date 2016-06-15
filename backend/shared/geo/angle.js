/**
 * Replaces jsts.algorithm.Angle since it seems to be missing right now.
 * Utility functions for working with angles. Unless otherwise noted, 
 * methods in this class express angles in radians.
 * @module geo/angle.js
 * @see http://bjornharrtell.github.io/jsts/doc/api/jsts.algorithm.Angle.html
 */

export function toDegrees(radians) {
	return radians * 180 / Math.PI;
};

export function normalize(angle) {
	while (angle > Math.PI) angle -= PI_TIMES_2;
	while (angle <= -Math.PI) angle += PI_TIMES_2;
	return angle;
};

export function angle() {
	if (arguments.length === 1) {
		let p = arguments[0];
		return Math.atan2(p.y, p.x);
	} else if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		return Math.atan2(dy, dx);
	}
};

export function isAcute(p0, p1, p2) {
	var dx0 = p0.x - p1.x;
	var dy0 = p0.y - p1.y;
	var dx1 = p2.x - p1.x;
	var dy1 = p2.y - p1.y;
	var dotprod = dx0 * dx1 + dy0 * dy1;
	return dotprod > 0;
};

export function isObtuse(p0, p1, p2) {
	var dx0 = p0.x - p1.x;
	var dy0 = p0.y - p1.y;
	var dx1 = p2.x - p1.x;
	var dy1 = p2.y - p1.y;
	var dotprod = dx0 * dx1 + dy0 * dy1;
	return dotprod < 0;
};

export function interiorAngle(p0, p1, p2) {
	var anglePrev = angle(p1, p0);
	var angleNext = angle(p1, p2);
	return Math.abs(angleNext - anglePrev);
};

export function normalizePositive(angle) {
	if (angle < 0.0) {
		while (angle < 0.0) angle += PI_TIMES_2;
		if (angle >= PI_TIMES_2) angle = 0.0;
	} else {
		while (angle >= PI_TIMES_2) angle -= PI_TIMES_2;
		if (angle < 0.0) angle = 0.0;
	}
	return angle;
};

export function angleBetween(tip1, tail, tip2) {
	var a1 = angle(tail, tip1);
	var a2 = angle(tail, tip2);
	return diff(a1, a2);
};

export function diff(ang1, ang2) {
	var delAngle = null;
	if (ang1 < ang2) {
		delAngle = ang2 - ang1;
	} else {
		delAngle = ang1 - ang2;
	}
	if (delAngle > Math.PI) {
		delAngle = 2 * Math.PI - delAngle;
	}
	return delAngle;
};

export function toRadians(angleDegrees) {
	return angleDegrees * Math.PI / 180.0;
};

export function getTurn(ang1, ang2) {
	var crossproduct = Math.sin(ang2 - ang1);
	if (crossproduct > 0) {
		return COUNTERCLOCKWISE;
	}
	if (crossproduct < 0) {
		return CLOCKWISE;
	}
	return NONE;
};

export function angleBetweenOriented(tip1, tail, tip2) {
	var a1 = angle(tail, tip1);
	var a2 = angle(tail, tip2);
	var angDel = a2 - a1;
	if (angDel <= -Math.PI) return angDel + PI_TIMES_2;
	if (angDel > Math.PI) return angDel - PI_TIMES_2;
	return angDel;
};

export const PI_TIMES_2 = 2.0 * Math.PI;
export const PI_OVER_2 = Math.PI / 2.0;
export const PI_OVER_4 = Math.PI / 4.0;
export const COUNTERCLOCKWISE = 1;
export const CLOCKWISE = -1;
export const NONE = 0;