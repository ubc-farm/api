import React, { PropTypes } from 'react';
import TextField from './text-field.js';

export default function NumberField(props) {
	return <TextField {...props} type='number'/>
}

NumberField.propTypes = Object.assign({
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['any'])
	]),
}, TextField.propTypes);

NumberField.defaultProps = Object.assign({
	step: 'any'
}, TextField.defaultProps)