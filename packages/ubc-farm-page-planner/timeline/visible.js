import {createElement as h, PropTypes, Component} from 'react'; /** @jsx h */

export default class VisibleTimeline extends Component {
	static get propTypes() {return {
		intervalMinWidth: PropTypes.number,
		width: PropTypes.number,
		scale: PropTypes.number,
		domainStart: PropTypes.instanceOf(Date),
		events: PropTypes.arrayOf(PropTypes.object)
	}}

	static get defaultProps() {return {
		intervalMinWidth: 8,
		width: window.innerWidth,
		scale: 1,
		domainStart: new Date()
	}}

	get domainEnd() {
		const {scale, domainStart, width} = this.props;

		const monthWidth = 160;
		const milliwidth = monthWidth / 2.628e+9;
		
		const visibleMilliseconds = (width * scale) / milliwidth;
		return new Date(domainStart + visibleMilliseconds);
	}
}