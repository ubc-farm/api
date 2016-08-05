import {createElement as h, PropTypes, PureComponent} from 'react'; 
/** @jsx h */
import AngleDial from './angle-dial.js';

export default class GridForm extends PureComponent {
	static get propTypes() {return {
		onSubmit: PropTypes.func,
		id: PropTypes.string,
		defaultWidth: PropTypes.number,
		defaultHeight: PropTypes.number,
		defaultAngle: PropTypes.number
	}}

	static get defaultProps() {return {
		id: 'grid-form'
	}}

	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWidthChange = this.handeChange.bind(this, 'width');
		this.handleHeightChange = this.handeChange.bind(this, 'height');
		this.handleAngleChange = this.handeChange.bind(this, 'angle');

		this.state = {
			width: props.defaultWidth, 
			height: props.defaultHeight, 
			angle: props.defaultAngle
		}
	}

	componentWillReceiveProps(nextProps) {
		Object.keys(this.state).map(prop => {
			const nextValue = nextProps[prop];
			if (nextValue !== undefined && nextValue !== this.state[prop])
				this.setState({[prop]: nextValue});
		})
	}

	handleChange(name, event) {
		this.setState({ [name]: event.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		const {width, height, angle} = this.state;

		return (
			<form onSubmit={this.handleSubmit} id={this.props.id}>
				<section id='grid-angle'>
					<label>
						<h5>Grid Angle</h5>
						<input min={0} max={360} step='any'
							onChange={this.handleAngleChange} value={angle}
							className='angle-field' name='angle'
						/>
						<AngleDial angle={angle} />
					</label>
				</section>

				<section id='grid-size'>
					<label>
						<h5>Grid Width</h5>
						<input min={0} step='any' name='width'
							onChange={this.handleWidthChange} value={width}
						/>
					</label>
					<label>
						<h5>Grid Height</h5>
						<input min={0} step='any' name='height'
							onChange={this.handleHeightChange} value={height}
						/>
					</label>
				</section>
			</form>
		);
	}
}