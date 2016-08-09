import {createElement as h, PropTypes, Component} from 'react'; /** @jsx h */

import Name from './name.js';
import Email from './email.js';
import Phone from './phone.js';
import Address from './address.js';

export default class Form extends Component {
	static get propTypes() {return {
		onSubmit: PropTypes.func.isRequired
	}}

	constructor(props) {
		super(props);

		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.state = { type: 'Person' };
	}

	handleTypeChange(type) { this.setState({type}) }

	render() {
		const {type} = this.state;
		return (
			<form /*onSubmit={this.props.onSubmit}*/>
			
			</form>
		)
	}
}