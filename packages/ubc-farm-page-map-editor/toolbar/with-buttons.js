import {createElement as h, PropTypes} from 'react'; /** @jsx h */
import BaseToolbar from './toolbar.js';

const Toolbar = ({
	breadcrumbs,
	adding = false, onAdd,
	resizing = false, onResize
}) => (
	<BaseToolbar breadcrumbs={breadcrumbs}>
		<label role='button'>
			<i className='material-icons breadcrumb-icon'>add</i>
			Add
			<input type='checkbox'
				checked={adding}
				onChange={onAdd}
				hidden
				className='hidden-checkbox'
			/>
		</label>
		<section className='sidebar-toolbar'>
			<label role='button'>
				<i className='material-icons breadcrumb-icon'>transform</i>
				Resize
				<input type='checkbox'
					checked={resizing}
					onChange={onResize}
					hidden
					className='hidden-checkbox'
				/>
			</label>
		</section>
	</BaseToolbar>
)

Toolbar.propTypes = {
	breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.node,
		href: PropTypes.string
	})).isRequired,
	adding: PropTypes.bool,
	resizing: PropTypes.bool,
	onAdd: PropTypes.func,
	onResize: PropTypes.func
}

export default Toolbar;