module.exports = class Angle extends Number {
	/**
	 * @param {number} number
	 * @param {boolean} [isHeading] - is the number a heading?
	 */
	constructor(num, isHeading = false) {
		num = ((num % 360) + 360) % 360
		if (isHeading) num = Angle.toAngle(num);
		super(num);
	}
	
	get angle() {return this;}
	get heading() {return Angle.toHeading(this);}
	
	/**
	 * Rotates the given angle by the amount provided
	 * @param {Angle} angle
	 * @param {number} shift - amount to shift by, in degrees.
	 */
	static rotate(angle, shift) {
		angle = Angle.parse(angle);
		return new Angle(angle + shift);
	}
	
	/** Converts angle (0 to 360) to heading (-180 to 180) */
	static toHeading(angle) {
		angle = ((angle % 360) + 360) % 360; //modulo
		if (angle <= 180) return angle;
		else return angle - 360;
	}
	
	/** Converts heading (-180 to 180) to angle (0 to 360) */
	static toAngle(heading) {
		if (heading >= 0) return heading;
		else return heading + 360; 
	}
	
	static parse(value) {
		if (value instanceof Angle) return value;
		else return new Angle(value);
	}
	
	/** 
	 * Finds the angle between two headings 
	 * @param {number} _angle1
	 * @param {number} _angle2
	 * @param {boolean} [asHeadings] - process angles as headings instead
	 */ 
	static angleBetween(_angle1, _angle2, asHeadings) {
		let [angle1, angle2] = 
			[_angle1, _angle2].map(a => Angle.parse(a, asHeadings).angle);
		let smaller, larger;
		if (angle1 < angle2) {
			smaller = angle1;
			larger = angle2;
		} else {
			smaller = angle2;
			larger = angle1;
		}
		
		let between = Math.abs(larger - smaller);
		if (between > 180) { //Too obtuse
			between = (smaller + 360) - larger;
		}
		
		return new Angle(between);
	}
}