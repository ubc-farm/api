import React, { Component, PropTypes } from 'react';
import {Checkbox} from '../form/checkbox.jsx';
import Button from './button.jsx';

export default class IconToggle extends Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}

	handleCheck(e) {
		
	}

	render() {
		return (
			<Checkbox onChange={this.handleCheck}>

			</Checkbox>
		);
	}
}