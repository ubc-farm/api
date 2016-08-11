import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import {classlist as cx, omit} from '../../ubc-farm-utils/index.js';

const MapButton = props => (
	<button type='button' 
		{...omit(props, 'onClick', 'children')}
		className={cx('map-button', props.className)} 
		onClick={props.onClick}
	>
		<i className='material-icons'>{props.children}</i>
	</button>
)

MapButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool
}

export default MapButton;