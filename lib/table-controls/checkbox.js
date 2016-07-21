import React, {Component, PropTypes} from 'react';

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set. 
 */
export default class Checkbox extends Component {
	render() {
		return (
			<input {...this.props} 
				indeterminate={undefined} 
				type='checkbox'
				ref={checkbox => this._checkbox = checkbox}
			/>
		);
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	componentDidMount() {
		const {indeterminate} = this.props;
		if (indeterminate !== undefined) 
			this._checkbox.indeterminate = indeterminate;
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