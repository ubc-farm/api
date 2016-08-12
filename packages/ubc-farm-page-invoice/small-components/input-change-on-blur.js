import {Component, PropTypes, cloneElement} from 'react';

/**
 * Wraps an input so that updates when focus is lost, instead of
 * every keystroke. This is mainly used for inputs where the typed in values
 * need to be converted to internal values and internal values need to be 
 * converted back. Changing every keystroke has unintended consequences for the
 * user as the input becomes annoying to use, so changing when focus is lost 
 * works better.
 */
export default class UpdateOnBlur extends Component {
	static get propTypes() {return {
		value: PropTypes.any.isRequired,
		onBlur: PropTypes.func.isRequired,
		inputProps: PropTypes.object,
		children: PropTypes.element
	}}

	constructor(props) {
		super(props);
		this.state = {renderedValue: props.value};
		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({renderedValue: nextProps.value});
	}

	handleChange(e) {
		this.setState({renderedValue: e.target.value});
	}
	handleBlur() {
		this.props.onBlur(this.state.renderedValue);
	}

	render() {
		return cloneElement(this.props.children, 
			Object.assign({}, this.props.inputProps, {
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				value: this.state.renderedValue,
				children: undefined
			})
		);
	}
}