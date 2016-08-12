import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */

export default class RoleField extends PureComponent {
	static get propTypes() {return {
		defaultValue: PropTypes.string,
		list: PropTypes.arrayOf(PropTypes.string),
		onTypeChange: PropTypes.func
	}}

	static get defaultProps() {return {
		list: []
	}}

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {value: props.defaultValue || '', type: ''};
	}

	get list() {
		return ['Employee', 'Researcher', ...this.props.list];
	}

	handleChange(e) {
		const {value} = e.target;
		this.setState({value});

		let newType;
		switch (value.toLowerCase().replace(/\s/g, '')) {
			case 'employee': newType = 'Employee'; break;
			case 'researcher': newType = 'Researcher'; break;
			default: newType = 'Person'; break;
		}

		if (newType !== this.state.type) {
			this.setState({type: newType});
			this.onTypeChange(newType);
		}
	}

	render() {
		return (
			<label>
				<span className='label-body'>Role</span>
				<input type='text' name='role'
					value={this.state.value}
					onChange={this.handleChange}
					list='role-list'
				/>
				<datalist id='role-list'>
					{this.list.map(v => <option value={v} key={v} />)}
				</datalist>
			</label>
		);
	}
}