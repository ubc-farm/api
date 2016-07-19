import React, {Component, PropTypes} from 'react';
import Table, {Column} from '../../lib/table-data/index.js';
import {classlist as cx} from '../../lib/utils/index.js';

const CHECKBOX = Symbol('CHECKBOX');

/**
 * Enhances the data table with interactive functionality
 */
export default class InteractiveTable extends Component {
	constructor(props) {
		super(props);

		const {sorting, selection} = props;
		let state = {
			settings: {
				sort: false,
				selected: false
			},
			sort: {
				columnKey: undefined,
				descending: true,
				ids: new Map()
			}, 
			selected: []
		};

		if (sorting) {
			state.settings.sort = true;

			if (typeof sorting === 'object' && sorting.columnKey) 
				state.sort.columnKey = sorting.columnKey
			else {
				const {data} = props; let firstColumnKey;
				for (const key in data[0]) {firstColumnKey = key; break;}
				state.sort.columnKey = firstColumnKey;
			}

			if (typeof sorting === 'object' && sorting.descending) 
				state.sort.descending = sorting.descending;
		}

		if (selection) {
			state.settings.selected = true;
			if (Array.isArray(selection)) state.selected = selection;
		}

		this.state = state;
	}

	render() {
		const {data} = this.props;
		const {selected, sort, settings} = this.state, sLength = selected.length;

		let columns = [];
		if (settings.selected) {
			columns.push(
				buildCheckboxesColumn(data.length, selected)
			);
		}
		columns.push(...buildColumns(data, settings.sort ? sort : undefined));

		return (
			<section className={cx('interactive-table', this.props.className)}>
				{this.props.children || settings.selected ? 
					<header className='table-header'>
						<div className='table-header-selected'
							style={{
								visibility: settings.selected && sLength>0 ? 'visible': 'hidden'
							}}
						>
							{settings.selected ?
								<span>{sLength} item{sLength>1 ? 's':''} selected</span> 
							: null}
						</div>
						<div className='table-header-main'>{this.props.children}</div>
					</header> 
				: null}
				<Table
					rowsCount={data.length}
					rowClassNameGetter={this.rowClassHelper}
					onRowClick={this.rowClickHelper}
					onColumnClick={this.columnClickHelper}
					rowKeyGetter={this.rowKeyHelper}
					children={columns}
				/>
			</section>
		)
	}

	rowKeyHelper(rowIndex) {
		const {settings, sort: {ids}} = this.state;
		if (settings.sort) return ids.get(rowIndex);
		else return rowIndex;
	}
	rowClassHelper(rowIndex) {
		const {settings, selected} = this.state;
		if (settings.selected && selected.includes(rowIndex)) return 'row-selected';
	}
	rowClickHelper(rowIndex) {
		const {selected, settings} = this.state;
		if (!settings.selected) return;

		let clone = selected.slice();
		if (selected.includes(rowIndex)) {
			clone.splice(clone.indexOf(rowIndex), 1);
		} else {
			clone.push(rowIndex);
		}
		this.setState({selected: clone});
	}

	columnClickHelper(columnKey) {
		const {sort, settings} = this.state;
		
		if (settings.selected && columnKey === CHECKBOX) {

			const length = this.props.data.length;
			const allSelected = this.state.selected.length === length;
			if (allSelected) {
				const oneToNArray = Array.from({length}, (v, index) => index);
				this.setState({selected: oneToNArray});
			} else {
				this.setState({selected: []});
			}

		} else if (settings.sort) {

			let newState = Object.assign({}, sort);
			if (sort.columnKey === columnKey) newState.descending = !sort.descending;
			else newState.columnKey = columnKey; newState.descending = true;

			newState.ids = sortData(this.props.data, newState);
			this.setState({sort: newState});

		}		
	}
}

InteractiveTable.propTypes = {
	selection: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.int),
		PropTypes.bool
	]),
	sorting: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({columnKey: PropTypes.string}),
		PropTypes.shape({descending: PropTypes.bool}),
		PropTypes.shape({
			columnKey: PropTypes.string,
			descending: PropTypes.bool
		})
	]),

	data: PropTypes.arrayOf(PropTypes.object).isRequired,

	className: PropTypes.string,
	children: PropTypes.node
}

/**
 * Sorts an array of objects using the provided info
 * @param {Object[]} data to sort
 * @param {string} opts.columnKey - values at this key are used for sorting
 * @param {boolean} [opts.descending=true] if false, reverse the sorted array
 * @returns {Map} getting a rowIndex returns the new index
 */
function sortData(data=[], {columnKey, descending = true}) {
	if (columnKey == null) return data;

	const type = typeof data[0][columnKey];
	let compareFunc;
	if (type === 'number') compareFunc = (a, b) => a - b; 	
	else compareFunc = (a, b) => a.localeCompare(b);

	const sorted = data
	.map(({value, index}) => ({value, index}))
	.sort((aObject, bObject) => {
		const a = aObject.value[columnKey], b = bObject.value[columnKey];
		return compareFunc(a, b);
	})
	if (!descending) sorted.reverse();

	const result = new Map();
	for (const [index, {index: oldIndex}] of sorted.entries()) 
		result.set(oldIndex, index);
	return result;
}

/**
 * Creates a column for checkboxes
 * @param {number} rowCount - amount of rows
 * @param {number[]} selectedRows - if a row index is present, it will be
 * marked as selected
 * @param {Map} [ids]
 * @returns {Column}
 */
function buildCheckboxesColumn(rowCount = 0, selectedRows = [], ids) {
	const sLength = selectedRows.length;
	return new Column({
		align: 'center', columnKey: CHECKBOX,
		header() {
			const allChecked = sLength === rowCount;
			const someChecked = sLength > 0 && !allChecked;
			return (
				<input type='checkbox' checked={allChecked} 
					ref={checkbox => {
						if (someChecked) checkbox.indeterminate = true;
					}}
				/>
			)
		},
		cell({rowIndex}) {
			const index = ids ? ids.get(rowIndex) : rowIndex;
			return <input type='checkbox' checked={selectedRows.includes(index)}/>
		}
	})
}

/**
 * @param {Object[]} data
 * @param {Object} [sortInfo]
 * @param {string} [sortInfo.columnKey]
 * @param {boolean} [sortInfo.descending=true]
 * @param {Object} [schema]
 * @param {Object} [tooltips]
 * @returns {Iterable<Column>}
 */
function* buildColumns(data, sortInfo, schema = data[0], tooltips = {}) {
	const sortKey = sortInfo ? sortInfo.columnKey : undefined;

	for (const columnKey in schema) {
		let align = 'left'; const type = typeof schema[columnKey];
		if (type == 'number') align = 'right';
		else if (type == 'boolean') align = 'center';

		const thisSorting = sortKey === columnKey; 

		let sortIcon = null;
		if (sortInfo) {
			const {descending = true} = sortIcon;
			sortIcon = (
				<i className='material-icons md-18'>
					{thisSorting && !descending ? 'arrow_upward': 'arrow_downward'}
				</i>
			)
		}

		yield new Column({
			columnKey, align,
			header: () => [
				<span key='normal'
					className={cx('table-cell-normal', {'hidden': thisSorting})}
				>
					{columnKey}
					{align === 'left' ? <span style={{width: 18}}/> : null}
				</span>,
				<span key='hover' title={tooltips[columnKey]}
					className={cx('table-cell-hover', {'visible': thisSorting})}
				>
					{align !== 'left' ? sortIcon : null}
					{columnKey}
					{align === 'left' ? sortIcon : null}
				</span>
			],
			cell({rowIndex}) {
				const index = sortInfo? sortInfo.ids.get(rowIndex) : rowIndex;
				return data[index][columnKey];
			} 
		});
	}
}