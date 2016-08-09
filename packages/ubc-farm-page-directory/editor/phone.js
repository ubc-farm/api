import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */

export default class PhoneFields extends PureComponent {
	static get propTypes() {return {
		defaultValue: PropTypes.string,
		label: PropTypes.node,
		name: PropTypes.string
	}}

	static get defaultProps() {return {
		label: 'Phone',
		name: 'phoneNumber'
	}}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);

		this.state = {value: props.defaultValue || ''};
	}

	get phoneNumber() {
		const num = this.state.phoneValue;
		if (num.length <= 3 || num.length > 10) {
			return num;
		} else if (num.length <= 7) {
			return num.substr(0, 3) + '-' + num.substr(3);
		} else if (num.length <= 10) {
			return `(${num.substr(0, 3)}) ${num.substr(3, 3)}-${num.substr(6)}`;
		} else if (num.length === 11 && num.startsWith('1')) {
			return `+1 (${num.substr(1, 3)}) ${num.substr(4, 3)}-${num.substr(7)}`;
		}
	}

	handleChange(e) {
		const text = e.target.value.replace(/\D/g, '');
		this.setState({phoneValue: text});
	}

	render() {
		return (
			<label>
				<span className='label-body'>{this.props.label}</span>
				<input type='tel' name={this.props.name}
					value={this.phoneNumber} 
					onChange={this.handleChange} 
					autoComplete='tel'
				/>
			</label>
		);
	}
}