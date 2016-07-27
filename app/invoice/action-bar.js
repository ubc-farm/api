import React, {PropTypes} from 'react';
import {classlist as cx} from '../../lib/utils/index.js'

/**
 * A table caption that toggles between 2 possible children depending on
 * selectedLength. Children must be an array of two items: the first is
 * normally displayed, and the second is displayed instead when items
 * are selected.
 */
const ActionBar = ({children: [standard, selected], selectedLength = 0}) => (
	<caption className='table-actions-container'>
		<section 
			className={cx(
				'table-actions', 'table-actions-standard',
				selectedLength === 0 ? 'visible' : 'hidden'
			)}
		>
			{standard}
		</section>
		<section 
			className={cx(
				'table-actions', 'table-actions-selected',
				selectedLength > 0 ? 'visible' : 'hidden'
			)}
		>
			<span className='selected-count'>
				{`${selectedLength} item${selectedLength > 1 ? 's' : ''} selected`}
			</span>
			{selected}
		</section>
	</caption>
)

ActionBar.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
	selectedLength: PropTypes.number
}

export default ActionBar;