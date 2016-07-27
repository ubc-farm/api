import React, {Component, PropTypes} from 'react';

const stop = e => e.stopPropagation();

/**
 * Used for inputs inside a table. Additionally, the placeholder will not
 * update from its initial prop, allowing for randomly-generated placeholders
 * that don't regenerate each re-render.
 */
export default class InvoiceInput extends Component {
	constructor(props) {
		super(props);

		const {placeholder: initialPlaceholder} = props;
		this.state = {initialPlaceholder};
	}

	render() {
		return (
			<input type='text' onClick={stop} 
				{...this.props}
				placeholder={this.state.initialPlaceholder}
			/>
		)
	}

	static get propTypes() {return {
		placeholder: PropTypes.string
	}}
}


/**
 * A variation of the InvoiceInput that updates when focus is lost, instead of
 * every keystroke. This is mainly used for inputs where the typed in values
 * need to be converted to internal values and internal values need to be 
 * converted back. Changing every keystroke has unintended consequences for the
 * user as the input becomes annoying to use, so changing when focus is lost 
 * works better.
 */
export class UpdateOnBlur extends Component {
	static get propTypes() {return {
		value: PropTypes.any.isRequired,
		onBlur: PropTypes.func.isRequired,
		inputProps: PropTypes.object
	}}

	constructor(props) {
		super(props);
		this.state = {renderedValue: props.value};
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(e) {
		this.setState({renderedValue: e.target.value});
	}
	onBlur() {
		this.props.onBlur(this.state.renderedValue);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({renderedValue: nextProps.value});
	}

	render() {
		return (
			<InvoiceInput {...this.props} 
				onBlur={this.onBlur} onChange={this.onChange}
				value={this.state.renderedValue}
			/>
		);
	}
}

