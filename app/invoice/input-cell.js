import React, {Component, PropTypes} from 'react';
import {Cell} from '../../lib/table-controls/index.js';

const stop = e => e.stopPropagation();

/**
 * Used for inputs inside a table. Additionally, the placeholder will not
 * update from its initial prop, allowing for randomly-generated placeholders
 * that don't regenerate each re-render.
 */
export default class InputCell extends Component {
	constructor(props) {
		super(props);
		const {placeholder} = props.inputProps || {};
		this.state = {placeholder};
	}

	render() {
		const {cellProps, inputProps, value = ''} = this.props;
		const {placeholder} = this.state;
		return (
			<Cell {...cellProps}>
				<input type='text' onClick={stop} 
					className='input-plain invoice-table-input'
					value={value}
					{...inputProps}
					placeholder={placeholder}
				/>
			</Cell>
		)
	}

	static get propTypes() {return {
		cellProps: PropTypes.object,
		inputProps: PropTypes.object,
		value: PropTypes.any
	}}
}


/**
 * A variation of the InputCell that updates when focus is lost, instead of
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
		const inputProps = Object.assign({}, this.props.inputProps, {
			onBlur: this.onBlur, onChange: this.onChange
		});
		return <InputCell {...this.props} 
			inputProps={inputProps}
			value={this.state.renderedValue}
		/>
	}
}

