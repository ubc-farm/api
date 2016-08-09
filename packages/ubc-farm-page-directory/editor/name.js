import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */

export default class RoleField extends PureComponent {
	static get propTypes() {return {
		defaultValue: PropTypes.string,
		onChange: PropTypes.string
	}}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {value: props.defaultValue || ''};
	}

	handleChange(e) {
		const {value} = e.target;

		this.setState({value});
		this.props.onChange(value);
	}

	render() {
		return (
			<label>
				<span className='label-body'>Name</span>
				<input type='text' name='name' 
					required
					value={this.state.value}
					onChange={this.handleChange}
				/>
			</label>
		);
	}
}