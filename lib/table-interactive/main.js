import React, {Component, PropTypes} from 'react';
import Table, {Column, Cell} from '../../lib/table-data/index.js';
import {classlist as cx, id, format} from '../../lib/utils/index.js';
import sortData from './sort.js';

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

			if (typeof sorting === 'object') 
				state.sort = Object.assign(state.sort, sorting);

			state.sort.ids = sortData(props.data, state.sort);
		}

		if (selection) {
			state.settings.selected = true;
			if (Array.isArray(selection)) state.selected = selection;
		}

		this.state = state;
	}

	/**
	 * @type {Map<string, string>} a map where the keys correspond to results from
	 * typeof, and the values correspond to possible alignments for a table cell.
	 * @example
	 * this.alignmentMap.get(typeof 0) // returns 'right'
	 * @abstract
	 */
	get alignmentMap() {
		return new Map([
			['number', 'right'],
			['boolean', 'center'],
		])
	}

	/**
	 * @param {number} amountSelected - amount of selected rows
	 * @returns {ReactElement} an element used to indicate how many rows 
	 * are selected to the user.
	 */
	selectedHeading(amountSelected) {
		const plural = amountSelected > 1;
		return <span>{amountSelected} item{plural ? 's':''} selected</span>;
	}
	/** @abstract @returns {Column[]} columns appended to the table */
	extraColumns() {return []}
	/** @abstract @returns {ReactElement} a heading for the table */
	heading() {return null}
	/** @abstract @returns {ReactElement} a tfoot element used in the table */
	tfoot() {return null;}
	/** @abstract @returns {ReactElement} a footer for the table */
	footer() {return null}

	/**
	 * The header cell for each column. Called when building columns.
	 * @param {string} title
	 * @param {string} [definition] - tooltip text 
	 * @param {boolean} active
	 * @param {boolean} sortDown
	 * @param {Object} props
	 * @param {string} props.align - used to align the cell left/center/right
	 * @param {function} props.onClick
	 * @param {ReactElement} props.children - meant to be the sorting icon
	 * @returns {ReactElement} 
	 */
	columnHeader(title, definition, active, sortDown, {align, onClick}) {
		return (
			<Cell header 
				className='th-hoverable'
				align={align} onClick={onClick} 
			>
				<span className={cx('table-cell-normal', {'hidden': active})}>
					{title}
				</span>
				<span 
					className={
						cx('table-cell-hover', `align-${align}`, {'visible': active})
					} title={definition}
				>
					{align !== 'left' ? this.sortingIcon(active, sortDown) : null}
					{title}
					{align === 'left' ? this.sortingIcon(active, sortDown) : null}
				</span>
			</Cell>
		)
	}

	/**
	 * The sorting icon used in the header cells. Returns null if sorting is 
	 * disabled.
	 * @param {boolean} active - darkens the icon to indicate the cell is selected
	 * @param {boolean} downard - displays a down arrow if true, up arrow if false
	 */
	sortingIcon(active, downward) {
		if (!this.state.settings.sort) return null;
		return (
			<i className={cx(
					'material-icons md-18',
					'table-sort-icon',
					{'sort-active': active}
				)}
				children={downward ? 'arrow_downward' : 'arrow_upward'}
			/>
		);
	}

	/**
	 * Iterates through the keys of the data object to create columns
	 * @returns {Iterable<Column>}
	 */
	*buildColumns() {
		const {data, tooltips = new Map(), cell = Cell, schema = data[0]} = this.props
		const sortFlag = this.state.settings.sort;
		const {columnKey: sortKey, descending, ids} = this.state.sort;

		for (const columnKey in schema) {
			yield new Column({
				columnKey, align: this.alignmentMap.get(detectType(schema[columnKey])),
				header: props => {
					const active = sortKey === columnKey;
					const {
						title = format(columnKey), definition
					} = tooltips.get(columnKey) || {};
					return this.columnHeader(title, definition, active, descending, props)
				},
				cell(props) {
					const {rowIndex} = props;
					const index = sortFlag? ids.get(rowIndex) : rowIndex;
					props = Object.assign({}, props, {rowIndex: index});
					return React.createElement(cell, props, String(data[index][columnKey]));
				} 
			});
		}
	}

	render() {
		const {data} = this.props;
		const {selected, sort, settings} = this.state, sLength = selected.length;

		let columns = [];
		if (settings.selected) 
			columns.push(this.buildCheckboxesColumn());

		columns.push(...this.buildColumns());

		if (settings.sort) {
			columns.push(...this.extraColumns().map(c => {
				let col = new Column(c);
				col.cell = props => c.cell(Object.assign({}, props, {
					rowIndex: settings.sort? sort.ids.get(props.rowIndex) : props.rowIndex
				}));
				return col;
			}))
		} else columns.push(...this.extraColumns());

		return (
			<section className={cx('interactive-table', this.props.className)}>
				{settings.selected ? 
					<header className='table-header'>
						<div className='table-header-selected'
							style={{
								visibility: settings.selected && sLength>0 ? 'visible': 'hidden'
							}}
						>
							{settings.selected ?
								this.selectedHeading(sLength)
							: null}
						</div>
						<div className='table-header-main'>{this.heading()}</div>
					</header> 
				: null}
				<Table
					rowsCount={data.length}
					rowClassNameGetter={this.rowClassHelper}
					onRowClick={this.rowClickHelper}
					onColumnClick={this.columnClickHelper}
					rowKeyGetter={this.rowKeyHelper}
					columns={columns}
					children={this.tfoot()}
				/>
				{this.footer()}
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
			schema: PropTypes.object,
			tooltips: PropTypes.instanceOf(Map),
			cell: PropTypes.node,
			extraColumns: PropTypes.arrayOf(PropTypes.instanceOf(Column)),

			className: PropTypes.string,
			children: PropTypes.node
		}
	}
}

/**
 * Returns either the typeof an object or the type listed there.
 * @param {string|any} typeSchema - if a string that corresponds to a result
 * from 'typeof', typeSchema is returned. Otherwise, the type of typeSchema is
 * returned.
 */
export function detectType(typeSchema) {
	const type = typeof typeSchema;
	if (type !== 'string') return type;
	const typeofRegExp = 
		/^(boolean|number|string|symbol|undefined|object|function)$/;
	if (typeofRegExp.test(typeSchema)) return typeSchema;
	else return type;
}