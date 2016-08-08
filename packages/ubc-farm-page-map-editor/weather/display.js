import {createElement as h, PureComponent, PropTypes} from 'react';
/** @jsx h */
import {Position} from '../../ubc-farm-utils/class/geojson/index.js';

/**
 * Displays weather data pulled from OpenWeatherMap.
 * The provided position is used to find weather data.
 */
export default class WeatherDisplay extends PureComponent {
	static get propTypes() {return {
		position: PropTypes.instanceOf(Position).isRequired
	}}

	constructor(props) {
		super(props);

		this.state = {};
		this.updateWeatherState();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.position !== this.props.position)
			this.updateWeatherState(nextProps.position);
	}

	updateWeatherState({lat, lng} = this.props.position) {
		return fetch('http://api.openweathermap.org/data/2.5/weather?units=metric'
		+ `lat=${lat}&lon=${lng}`)
		.then(response => response.json())
		.then(json => this.setState(json));
	}

	render() {
		if (Object.keys(this.state).length === 0) return null;
		const {weather, main: {temp}} = this.state;

		return (
			<div className='weater-data'>
				<img alt={weather.description} className='weather-data-icon'
					src={`http://openweathermap.org/img/w/${weather.icon}.png`}
				/>
				<p>{temp}{'°C'}</p>
			</div>
		);
	}
}