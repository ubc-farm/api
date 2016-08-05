import {createElement as h, PropTypes} from 'react'; /** @jsx h */

const ClockHand = ({angle}) => (
	<span className='t-picker-hand' style={{transform: `rotateZ(${angle}deg)`}}>
		<span className='t-picker-hand-body' />
	</span>
)

ClockHand.propTypes = {
	children: PropTypes.node.isRequired,
	angle: PropTypes.number.isRequired
}

export default ClockHand;