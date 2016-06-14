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
		this.props.onChange(e.target.value);
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
		let {value, focused} = this.state;
		let props = this.props;
		let {key: id, hint: placeholder, maxLength: maxlength} = props; 
		let extraProps = {
			id, placeholder, maxlength,
			value, name: props.name || id,
			className: 'text-field-input',
			'data-suffix': suffix,
			onFocus: this.onFocus, onBlur: this.onBlur
		}
		delete props.key; delete props.hint; delete props.maxLength;
		delete props.children; delete props.suffix;
		let classList = _('text-field', props.className, {
			'text-field-focus': focused,
			'text-field-force-helper': this.props.persistHelper,
			'text-field-floating': props.float,
			'text-field-disabled': disabled
		});

		return (
			<div className={classList} key={id}>
				<label htmlFor={id} className={_({
				 'floating-label': props.float
				})}>
					{this.props.children}
				</label>
				<input {...props} {...extraProps} onChange={this.handleChange}/>
				{this.renderHelper()} 
				{this.renderError()} 
				{this.renderCounter()}
			</div>
		)
	}

	/**
	 * @memberof TextField
	 * @name props
	 * @property {function} [onFocusChange] - callback for when input is 
	 * focused/blurred. If focused, passed true. If blurred, passed false.
	 * @property {function} [onChange] - callback for value change
	 * @property {any} key - also used as input name (unless overriden)
	 * @property {string} [type=text] - type for the input.
	 * Only a few types, related to text, are allowed.
	 * @property {number} [maxLength] - sets a maxiumum length for the input,
	 * which will also cause a character counter to be rendered.
	 * @property {string} [hint] text displayed as a placeholder inside the input.
	 * Should be unimportant example text (same pitfalls as input placeholder)
	 * @property {string} [error] text shown (with CSS) if the input is invalid.
	 * Extend this component instead if you want more advanced error-checking.
	 * @property {string} [helper] text shown after the input when focused. 
	 * Should be instruction text.
	 * @property {boolean} [persistHelper] - always show the helper text if true
	 * @property {boolean} [float=true] - sets a class to indicate a floating 
	 * label should be used for the input.
	 * @property {string} [suffix] - displays a suffix for the text input, such as
	 * a unit like kg or °.
	 * @property {boolean} [disabled] - disabled the input
	 * @property {boolean} [required] - flags the input as required
	 * @property {string} [name] overrides the name for the input
	 */
	static get propTypes() {
		return {
			onFocusChange: PropTypes.func,
			onChange: PropTypes.func,
			key: PropTypes.any.isRequired,
			type: PropTypes.oneOf([
				'email', 'text', 'url', 'tel'
			]),
			maxLength: PropTypes.number,
			hint: PropTypes.string,
			error: PropTypes.string,
			helper: PropTypes.string,
			persistHelper: PropTypes.bool,
			float: PropTypes.bool,
			suffix: PropTypes.string,

			disabled: PropTypes.bool,
			required: PropTypes.bool,
			name: PropTypes.string,
			pattern: PropTypes.string
		}
	}

	static get defaultProps() {
		return {
			maxLength: -1,
			type: 'text',
			onFocusChange: () => {},
			onChange: () => {},
			float: true
		}
	}
}