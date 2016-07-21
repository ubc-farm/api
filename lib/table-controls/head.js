import React, {Component, PropTypes} from 'react';
import {classlist as cx} from '../../lib/utils/index.js';
import Column from './column.js';
import Cell from './cell.js';
import Checkbox from './checkbox.js';

/** An arrow displayed in header cells to indicate sorting direction */
const SortIcon = ({active, descending}) => (
	<i 
		className={cx(
			'material-icons md-18 table-sort-icon', 
			{'sort-active': active})
		}
		children={descending ? 'arrow_downward' : 'arrow_upward'}
	/>
);
SortIcon.propTypes = {active: PropTypes.bool, descending: PropTypes.bool};

/**
 * A header cell for the table. Two copies of the header text are created, 
 * the first can be truncated for smaller columns and the second is revealed
 * on hover to show the full text, as well as display an icon to indicate 
 * sorting is possible (if enabled).
 */
const HeaderCell = props => {
	const {children, description, align, onClick, width} = props;
	const {useSorting, active} = props;

	return (
		<Cell header 
			className='th-hoverable' 
			align={align} onClick={onClick}
			style={!useSorting ? {cursor: 'default'} : undefined}
		>
			<span className={cx('table-cell-normal', {'hidden': active})}
				style={width !== undefined ? {width} : undefined}
			>
				{children}
			</span>
			<span title={description}
				className={cx(`table-cell-hover align-${align}`, {'visible': active})}
			>
				{useSorting && align !== 'left' ? <SortIcon {...props}/> : null}
				{children}
				{useSorting && align === 'left' ? <SortIcon {...props}/> : null}
			</span>
		</Cell>
	);
}

HeaderCell.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	onClick: PropTypes.func,
	useSorting: PropTypes.bool,
	active: PropTypes.bool,
	descending: PropTypes.bool,
	width: PropTypes.number
}

/**
 * The thead element for a table. Columns are built from the column array 
 * that is provided. If selectedLength is provided, a checkbox column is
 * created as well.  
 */
export default class Head extends Component {
	static get propTypes() {return {
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
		selectedLength: PropTypes.number,
		dataLength: props => {
			if (props.selectedLength !== undefined 
			&& typeof props.dataLength !== 'number'
			&& props.dataLength > -1) {
				return new Error('selectedLength prop is set, ' + 
					'but dataLength is missing or not a valid number');
			}
		},
		onColumnClick: PropTypes.func,
		onCheckboxChange: PropTypes.func,
		sorting: PropTypes.shape({
			columnKey: PropTypes.string,
			descending: PropTypes.bool
		})
	}}

	constructor(props) {
		super(props);

		const {onColumnClick} = props;
		let onClicks = new Map();
		if (onColumnClick) {
			for (const {columnKey} of props.columns) 
				onClicks.set(columnKey, () => onColumnClick(columnKey));
		}
		this.state = {onClicks};
	}

	render() {
		const {columns, sorting, selectedLength, onCheckboxChange} = this.props;
		const sortKey = sorting && sorting.columnKey;
		const descending = sorting && sorting.descending;
		const allSelected = selectedLength === this.props.dataLength;
		
		return (
			<thead>
				<tr className='table-th-row'>
					{selectedLength !== undefined ? 
						<Cell header align='center'>
							<Checkbox
								checked={allSelected}
								indeterminate={selectedLength > 0 && !allSelected}
								onChange={onCheckboxChange}
								readOnly={onCheckboxChange ? false : true}
							/>
						</Cell>
					: null}
					{columns.map(({columnKey, description, title, align, useSorting}) => (
						<HeaderCell key={columnKey}
							description={description} align={align}
							onClick={this.state.onClicks.get(columnKey)}
							useSorting={useSorting}
							active={useSorting && sortKey == columnKey}
							descending={useSorting ? descending : undefined}
						>{title}</HeaderCell>
					))}
				</tr>
			</thead>
		);
	}
}