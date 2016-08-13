import {createElement as h, PropTypes, Component} from 'react'; /** @jsx h */
import {classlist as cx} from '../../ubc-farm-utils/index.js';

export const Tasks = new Map([
	['Seeding', 'rgb(51, 105, 30)'],
	['Irrigation', 'rgb(1, 87, 155)'], 
	['Pest Control', 'rgb(183, 28, 28)'],
	['Transplanting', 'rgb(130, 119, 23)'],
	['Soil Sampling', 'rgb(62, 39, 35)'],
	['Scouting: Harvest', 'rgb(49, 27, 146)'],
	['Scouting: Pests', 'rgb(136, 14, 79)']
]);

export default class TaskTile extends Component {
	static get propTypes() {return {
		color: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
	}}

	constructor(props) {
		super(props);

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);

		this.state = {
			dragging: false
		}
	}

	componentDidMount() {
		this._ref.style.setProperty('--brand-primary', this.props.color);
	}

	handleDragStart(e) {
		this.setState({dragging: true});
		e.dataTransfer.dropEffect = 'copy';
		e.dataTransfer.setData('text/plain', this.props.name);
	}

	handleDragEnd(e) {
		e.preventDefault();
		this.setState({dragging: false});
	}

	render() {
		return (
			<span 
				className={cx('task-tile', {
					'dragging': this.state.dragging
				})}
				ref={s => this._ref = s}
				draggable='true'
				onDragStart={this.handleDragStart}
				onDragEnd={this.handleDragEnd}
			>
				{this.props.name}
			</span>
		)
	}
}