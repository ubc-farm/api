import {createElement as h, PropTypes} from 'react'; /** @jsx h */

export const ClockHand = ({angle}) => (
	<span className='t-picker-hand' style={{transform: `rotateZ(${angle}deg)`}}>
		<span className='t-picker-hand-body' />
	</span>
)

ClockHand.propTypes = {
	angle: PropTypes.number.isRequired
}

export const ClockDialCircle = () => <div className='circle t-picker-circle' />

export const ClockCenter = () => <div className='circle t-picker-center' />