import {createElement as h, PropTypes, Component} from 'react'; /** @jsx h */
import {omit} from '../../ubc-farm-utils/index.js';

/**
 * A checkbox component. Adds a 'indeterminate' prop, which allows for the
 * indeterminate value of a checkbox to be set. 
 */
export default class Checkbox extends Component {
	static get propTypes() {return {
		indeterminate: PropTypes.bool,
		checked: PropTypes.bool,
		defaultChecked: PropTypes.bool,
		onChange: PropTypes.func,
		readOnly: PropTypes.bool
	}}

	componentDidMount() {
		this.handleIndeterminate(this.props.indeterminate);
	}

	shouldComponentUpdate(nextProps) {return this.props !== nextProps;}

	componentDidUpdate(prevProps) {
		const {indeterminate} = this.props;
		if (indeterminate !== prevProps.indeterminate)
			this.handleIndeterminate(indeterminate);
	}

	/**
	 * Indeterminate must be set manually, so get a ref to the checkbox and
	 * apply the indeterminate value if nessecary.
	 */
	handleIndeterminate(flag) {
		this._checkbox.indeterminate = flag;
	}

	render() {
		return (
			<input {...omit(this.props, 'indeterminate')} 
				type='checkbox'
				ref={checkbox => this._checkbox = checkbox}
			/>
		);
	}
}