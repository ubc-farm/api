import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeData} from './actions.js'

/**
 * Used for inputs inside a table. Additionally, the placeholder will not
 * update from its initial prop, allowing for randomly-generated placeholders
 * that don't regenerate each re-render.
 */
class InvoiceInput extends Component {
	constructor(props) {
		super(props);

		const {placeholder} = props;
		this.state = {placeholder};
	}

	static stop(e) {e.stopPropagation();}

	render() {
		return (
			<input type='text' 
				onClick={InvoiceInput.stop} 
				{...this.props}
				placeholder={this.state.placeholder}
			/>
		)
	}

	static get propTypes() {return {
		placeholder: PropTypes.string,
		rowKey: PropTypes.string.isRequired,
		column: PropTypes.any.isRequired
	}}

	static mapStateToProps(state, ownProps) {
		const {rowKey, column} = ownProps;
		return {
			value: column.getValue(state.data.get(rowKey))
		};
	}

	static mapDispatchToProps(dispatch, ownProps) {
		const {rowKey, column} = ownProps;
		return {
			onChange: e => dispatch(changeData(e.target.value, rowKey, column))
		};
	}
}

export default connect(
	InvoiceInput.mapStateToProps,
	InvoiceInput.mapDispatchToProps
)(InvoiceInput);


/**
 * A variation of the InvoiceInput that updates when focus is lost, instead of
 * every keystroke. This is mainly used for inputs where the typed in values
 * need to be converted to internal values and internal values need to be 
 * converted back. Changing every keystroke has unintended consequences for the
 * user as the input becomes annoying to use, so changing when focus is lost 
 * works better.
 */
class UpdateOnBlur extends Component {
	static get propTypes() {return {
		value: PropTypes.any.isRequired,
		onBlur: PropTypes.func.isRequired,
		inputProps: PropTypes.object,
		transformerOut: PropTypes.func
	}}

	static get defaultProps() {return {
		transformerOut: v => v
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

export const InvoiceInputBlur = connect(
	(state, {rowKey, column}) => {
		const val = column.getValue(state.data.get(rowKey));
		return {
			value: val === undefined ? '' : String(val)
		};
	},
	(dispatch, {rowKey, column, transformerOut}) => ({
		onBlur: value => {
			const transformed = transformerOut(value);
			return dispatch(changeData(transformed, rowKey, column));
		}
	}),
	undefined,
	{pure: false}
)(UpdateOnBlur);