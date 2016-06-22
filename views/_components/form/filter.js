import React, { Component, PropTypes, Children } from 'react';
import _ from '../classnames.js';

import {Checkbox, Radio} from './checkbox.js';

export default class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {checked: new Set()};
	}

	render() {
		
	}

	static get propTypes() {
		return {
			onChange: PropTypes.func
		}
	}
}