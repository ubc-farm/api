import React, { Component, PropTypes } from 'react';
import _ from '../classnames.js';

/**
 * A text field for a single line of text
 */
export default class TextField extends Component {
	constructor(props) {
		super(props);
		this.state = {value: '', focused: false}

		this.handleChange = this.handleChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onFocus() {
		this.setState({focused: true});
		this.props.onFocusChange(true);
	}
	onBlur() {
		this.setState({focused: false});
		this.props.onFocusChange(false);
	}

	handleChange(e) {
		this.setState({value: e.target.value})
	}

	renderHelper() {
		if (this.props.helper) {
			return (
				<span className='text-field-helpertext'>
					{this.props.helper}
				</span>
			)
		} else return null;
	}

	renderCounter() {
		if (this.props.maxLength > -1) {
			return (
				<span className='text-field-counter'>
					{this.state.value.length} / {this.props.maxLength}
				</span>
			)
		} else return null;
	}

	renderError() {
		if (this.props.error) {
			return (
				<span className='text-field-helpertext text-field-errortext' hidden>
					{this.props.error}
				</span>
			)
		} else {
			return null;
		}
	}

	render() {
		let classList = _('text-field', {
			'text-field-focus': this.state.focused,
			'text-field-force-helper': this.props.persistHelper
		});
		let {key: id, textType: type, disabled, hint: placeholder, pattern} = this.props;
		let inputProps = {id, type, disabled, placeholder, required, pattern};
		return (
			<div className={classList} 
			     key={this.props.key}>
				<label htmlFor={this.props.key}>
					{this.props.children}
				</label>
				<input {...inputProps} className='text-field-input'
				       value={this.state.value} onChange={this.handleChange}
							 name={this.props.name || this.props.key}/>
				{this.renderHelper()} 
				{this.renderError()} 
				{this.renderCounter()}
			</div>
		)
	}

	static get propTypes() {
		return {
			onFocusChange: PropTypes.func,
			key: PropTypes.any.isRequired,
			textType: PropTypes.oneOf([
				'email', 'text', 'url', 'tel'
			]),
			maxLength: PropTypes.number,
			hint: PropTypes.string,
			error: PropTypes.string,
			helper: PropTypes.string,
			persistHelper: PropTypes.boolean,

			disabled: PropTypes.boolean,
			required: PropTypes.boolean,
			name: PropTypes.string,
			pattern: PropTypes.string
		}
	}

	static get defaultProps() {
		return {
			maxLength: -1,
			textType: 'text'
		}
	}
}