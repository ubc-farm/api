import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */

export default class WorkingDaysField extends PureComponent {
	static get propTypes() {return {
		defaultValue: PropTypes.arrayOf(PropTypes.bool)
	}}

	static get defaultProps() {return {
		defaultValue: Array(7).fill(false)
	}}

	constructor(props) {
		super(props);

		let listeners = [], state = {};
		for (const [index, defaultValue] of props.defaultValue.entries()) {
			listeners[index] = this.handleCheck.bind(this, index);
			state[index] = defaultValue
		} 

		this.handlers = listeners;
		this.state = state;
	}

	static get labels() { return ['S', 'M', 'T', 'W', 'T', 'F', 'S']; }
	static get names() { return [
		'working_sunday',
		'working_monday',
		'working_tuesday',
		'working_wednesday',
		'working_friday',
		'working_saturday',
	]; }

	handleCheck(index, e) {
		this.setState({ [index]: e.target.checked });
	}

	render() {
		let inputs = [];
		for (const [index, name] of WorkingDaysField.names) {
			const value = this.state[index];
			inputs.push(
				<input type='checkbox' hidden 
					name={name} id={name} key={name}
					checked={value}
					onChange={this.handlers[index]}
				/>
			);
			inputs.push(
				<label className='working-days-button'
					key={name + '-label'}
					htmlFor={name} 
					aria-role='checkbox'
					aria-checked={value}
				>
					{WorkingDaysField.labels[index]}
				</label>
			);
		}

		return (
			<fieldset name='working_days' className='working-days'>{inputs}</fieldset>
		);
	}
}