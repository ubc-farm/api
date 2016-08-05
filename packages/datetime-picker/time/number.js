import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist} from '../../ubc-farm-utils/index.js';

const ClockNumber = ({angle, children, offset = 100, className}) => (
	<span className={classlist('t-picker-number', className)}
		style={{transform: `translateY(${offset}px) rotateZ(${angle}deg)`}}
	>
		{children}
	</span>
)

ClockNumber.propTypes = {
	children: PropTypes.node.isRequired,
	angle: PropTypes.number.isRequired,
	className: PropTypes.string,
	offset: PropTypes.number
}

export default ClockNumber;