import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */

export default class EmailPhoneFields extends PureComponent {
	static get propTypes() {return {
		defaultEmail: PropTypes.string,
		defaultPhone: PropTypes.string
	}}

	constructor(props) {
		super(props);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);

		this.state = {phoneValue: props.defaultPhone || ''};
	}

	get phoneText() {
		const num = this.state.phoneValue;
		if (num.length <= 3) {
			return num;
		} else if (num.length <= 7) {
			return num.substr(0, 3) + '-' + num.substr(3);
		} else if (num.length <= 10) {
			return `(${num.substr(0, 3)}) ${num.substr(3, 3)}-${num.substr(6)}`;
		} else {
			return num;
		}
	}

	handlePhoneChange(e) {
		const text = e.target.value.replace(/\D/g, '');
		this.setState({phoneValue: text});
	}

	render() {
		return (
			<section>
				<label>
					<span className='label-body'>Email</span>
					<input type='email' name='email'
						defaultValue={this.props.defaultEmail}
						autoComplete='email'
					/>
				</label>

				<label>
					<span className='label-body'>Phone</span>
					<input type='tel' name='phoneNumber'
						value={this.phoneText} 
						onChange={this.handlePhoneChange} 
						autoComplete='tel'
					/>
				</label>
			</section>
		);
	}
}