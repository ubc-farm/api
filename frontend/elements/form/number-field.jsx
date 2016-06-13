import React, { Component, PropTypes } from 'react';
import TextField from './text-field.js';

export default class NumberField extends TextField {
	render() {
		return React.cloneElement(super.render(), Object.assign({
			type: 'number'
		}, this.props));
	}

	static get propTypes() {
		let superProps = super.propTypes;
		delete superProps.type;
		delete superProps.maxLength;
		let props = {
			min: PropTypes.number,
			max: PropTypes.number,
			step: PropTypes.number
		}
		return Object.assign(props, superProps);
	}

	static get defaultProps() {
		let superDefaults = super.defaultProps;
		delete superDefaults.type;
		delete superDefaults.maxLength;
		let defaults = {
			step: 'any'
		}
		return Object.assign(defaults, superDefaults);
	}
}