import React, {Component, PropTypes} from 'react';
import {omit} from '../../lib/utils/index.js';

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set. 
 */
export default class Checkbox extends Component {
	render() {
		return (
			<input {...omit(this.props, 'indeterminate')} 
				type='checkbox'
				ref={checkbox => this._checkbox = checkbox}
			/>
		);
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	setInderminate(flag) {
		this._checkbox.indeterminate = flag;
	}

	componentDidMount() {
		this.setInderminate(this.props.indeterminate);
	}

	componentDidUpdate(prevProps) {
		const {indeterminate} = this.props;
		if (indeterminate !== prevProps.indeterminate)
			this.setInderminate(indeterminate);
	}

	static get propTypes() {return {
		indeterminate: PropTypes.bool,
		checked: PropTypes.bool,
		defaultChecked: PropTypes.bool,
		onChange: PropTypes.func,
		readOnly: PropTypes.bool
	}}

	shouldComponentUpdate(nextProps) {
		return this.props !== nextProps;
	}
}