import React, { Component, PropTypes } from 'react';
import IfTag from '../helpers.js';
import _ from '../classnames.js';

/**
 * A text field for a single line of text
 */
export default class TextField extends Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value, focused: false}

		this.handleChange = this.handleChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.value !== nextProps.value) 
			this.setState({value: nextProps.value})
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

	render() {
		const {value, focused} = this.state;
		let props = Object.assign({}, this.props); //clone 
		const {hint: placeholder, maxLength: maxlength} = props; 
		let extraProps = {
			placeholder, maxlength,
			value, name: props.name || props.id,
			className: 'text-field-input',
			onFocus: this.onFocus, onBlur: this.onBlur
		}
		delete props.hint; delete props.maxLength;
		delete props.children; delete props.suffix;
		const classList = _('text-field', props.className, {
			'text-field-force-helper': this.props.persistHelper,
			'text-field-floating': props.float,
			'text-field-disabled': props.disabled
		});

		return (
			<div className={classList} key={props.id} data-focus={focused}>
				<label htmlFor={props.id} className={_(
					'text-field-label', {
					'text-field-label-focus': focused,
					'floating-label': props.float
				})} data-text={this.props.children}>
					{this.props.children}
				</label>
				<input {...props} {...extraProps} onChange={this.handleChange}/>
				<span className='text-field-border'/>
				<IfTag cond={this.props.suffix}>
					<span className='text-field-suffix'>
						{this.props.suffix}
					</span>
				</IfTag>
				<IfTag cond={this.props.helper}>
					<span className='text-field-helpertext'>
						{this.props.helper}
					</span>
				</IfTag>
				<IfTag cond={this.props.error}>
					<span className='text-field-helpertext text-field-errortext' hidden>
						{this.props.error}
					</span>
				</IfTag>
				<IfTag cond={this.props.maxLength > -1}>
					<span className='text-field-counter'>
						{this.state.value.length} / {this.props.maxLength}
					</span>
				</IfTag>
			</div>
		)
	}

	/**
	 * @memberof TextField
	 * @name props
	 * @property {function} [onFocusChange] - callback for when input is 
	 * focused/blurred. If focused, passed true. If blurred, passed false.
	 * @property {function} [onChange] - callback for value change
	 * @property {any} id - also used as input name (unless overriden)
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
	 * @property {boolean} [float] - sets a class to indicate a floating 
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
			id: PropTypes.any.isRequired,
			type: PropTypes.oneOf([
				'email', 'text', 'url', 'tel',
				//PRIVATE TYPES
				'number' 
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
			pattern: PropTypes.string,
			value: PropTypes.any
		}
	}

	static get defaultProps() {
		return {
			maxLength: -1,
			type: 'text',
			onFocusChange: () => {},
			onChange: () => {},
			value: ''
		}
	}
}