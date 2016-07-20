import React, {Component, PropTypes} from 'react';
import Table, {Column, Cell} from '../../lib/table-data/index.js';
import {classlist as cx, id} from '../../lib/utils/index.js';

const CHECKBOX = id();

/**
 * Enhances the data table with interactive functionality
 */
export default class InteractiveTable extends Component {
	constructor(props) {
		super(props);

		this.rowClassHelper = this.rowClassHelper.bind(this);
		this.rowClickHelper = this.rowClickHelper.bind(this);
		this.columnClickHelper = this.columnClickHelper.bind(this);
		this.rowKeyHelper = this.rowKeyHelper.bind(this);
		this.buildCheckboxesColumn = this.buildCheckboxesColumn.bind(this);

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
			/*else {
				const {data} = props; let firstColumnKey;
				for (const key in data[0]) {firstColumnKey = key; break;}
				state.sort.columnKey = firstColumnKey;
			}*/

			if (typeof sorting === 'object' && sorting.descending) 
				state.sort.descending = sorting.descending;

			if (typeof sorting === 'object' && sorting.columnKey) 
				state.sort.ids = sortData(props.data, state.sort);
			else state.sort.ids = sortData(props.data);
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
				this.buildCheckboxesColumn.call(this)
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
					columns={columns}
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
		if (settings.selected && selected.includes(rowIndex)) return 'checked';
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
			if (!allSelected) {
				const oneToNArray = Array.from({length}, (v, index) => index);
				this.setState({selected: oneToNArray});
			} else {
				this.setState({selected: []});
			}

		} else if (settings.sort) {

			let newState = Object.assign({}, sort);
			if (sort.columnKey === columnKey) newState.descending = !sort.descending;
			else {
				newState.columnKey = columnKey; 
				newState.descending = true;
			}

			newState.ids = sortData(this.props.data, newState);
			this.setState({sort: newState});

		}		
	}

	/**
	 * Creates a column for checkboxes
	 * @returns {Column}
	 */
	buildCheckboxesColumn() {
		const rowCount = this.props.data.length, selectedRows = this.state.selected;
		const sLength = selectedRows.length;
		let ids; if (this.state.settings.sort) ids = this.state.sort.ids;
		const headerRef = checkbox => this._columnCheckbox = checkbox;
		
		return new Column({
			align: 'center', columnKey: CHECKBOX,
			header(props) {
				const allChecked = sLength === rowCount;
				return (
					<Cell {...props} header>
						<input type='checkbox' checked={allChecked} readOnly
							ref={headerRef}
						/>
					</Cell>
				)
			},
			cell({rowIndex, align}) {
				const index = ids ? ids.get(rowIndex) : rowIndex;
				return (
					<Cell align={align}>
						<input type='checkbox' readOnly 
							checked={selectedRows.includes(index)}
						/>
					</Cell>
				)
			}
		})
	}

	componentDidUpdate() {
		if (!this._columnCheckbox) return;

		const sLength = this.state.selected.length;
		const someChecked = sLength > 0 && sLength !== this.props.data.length;
		if (someChecked) this._columnCheckbox.indeterminate = true;
	}

	static get propTypes() {
		return {
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
	}
}

/**
 * Sorts an array of objects using the provided info
 * @param {Object[]} data to sort
 * @param {string} opts.columnKey - values at this key are used for sorting
 * @param {boolean} [opts.descending=true] if false, reverse the sorted array
 * @returns {Map} getting a rowIndex returns the new index
 */
function sortData(data = [], {columnKey, descending = true} = {}) {
	if (columnKey == null) {
		const simple = new Map();
		for (const index of data.keys()) simple.set(index, index);
		return simple; 
	}

	const type = typeof data[0][columnKey];
	let compareFunc;
	if (type === 'number') compareFunc = (a, b) => a - b; 	
	else compareFunc = (a, b) => a.localeCompare(b);

	const sorted = data
	.map((value, index) => ({value, index}))
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
			if (thisSorting) {
				const {descending = true} = sortInfo;
				sortIcon = (
					<i className='material-icons md-18 table-sort-icon sort-active'>
						{descending ? 'arrow_downward' : 'arrow_upward'}
					</i>
				)
			} else {
				sortIcon = (
					<i className='material-icons md-18 table-sort-icon'>arrow_downward</i>
				);
			}	
		}

		yield new Column({
			columnKey, align,
			header: ({align, onClick, columnKey}) => (
				<Cell header align={align} onClick={onClick} className='th-hoverable'>
					<span key='normal'
						className={cx('table-cell-normal', {'hidden': thisSorting})}
					>
						{columnKey}
						{align === 'left' ? <span style={{width: 18}}/> : null}
					</span>
					<span key='hover' title={tooltips[columnKey]} hidden
						className={cx(
							'table-cell-hover', 
							`align-${align}`,
							{'visible': thisSorting}
						)}
					>
						{align !== 'left' ? sortIcon : null}
						{columnKey}
						{align === 'left' ? sortIcon : null}
					</span>
				</Cell>
			),
			cell({rowIndex, columnKey}) {
				const index = sortInfo? sortInfo.ids.get(rowIndex) : rowIndex;
				return <Cell>{data[index][columnKey]}</Cell>;
			} 
		});
	}
}