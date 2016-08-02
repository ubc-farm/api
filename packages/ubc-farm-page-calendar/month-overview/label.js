import {createElement as h, PropTypes} from 'react'; /** @jsx h */

/**
 * Label for the overview, meant to display the month name and 
 * show arrows for moving to the previous and following months.
 */
const OverviewLabel = ({children, onLeftClick, onRightClick}) => (
	<caption>
		<button type='button'
			onClick={onLeftClick}
			className='material-icons'
		>
			keyboard_arrow_left
		</button>

		<h3>{children}</h3>

		<button type='button'
			onClick={onRightClick}
			className='material-icons'
		>
			keyboard_arrow_right
		</button>
	</caption>
);

OverviewLabel.propTypes = {
	children: PropTypes.node,
	onLeftClick: PropTypes.func,
	onRightClick: PropTypes.func
}

export default OverviewLabel;