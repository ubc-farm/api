(function (exports,React) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  /**
   * A simple javascript utility for conditionally joining classNames together.
   * Slight ES6 adjustments from the fork.
   * @see https://github.com/JedWatson/classnames
   * @alias module:lib/utils.classlist
   */
  function classList(...classes) {
  	let list = [];
  	for (let classname of classes) {
  		if (!classname) continue; //skip falsy values

  		const type = typeof classname;
  		if (type === 'string' || type === 'number') list.push(classname);else if (Array.isArray(classname)) list.push(classList(...classname));else if (type === 'object') {
  			for (let key in classname) if (has(classname, key) && classname[key]) list.push(key);
  		}
  	}
  	return list.join(' ');
  }

  /**
   * Creates an object composed of the own string keyed
   * properties of source that are not set to be omitted.
   * @param {Object} source
   * @param {...string|string[]} props
   * @returns {Object}
   */
  function omit(source = {}, ...props) {
    if (props.length === 0 && Array.isArray(props[0])) props = props[0];

    let target = {};
    for (const key in source) {
      if (!props.includes(key)) target[key] = source[key];
    }

    return target;
  }

  /**
   * Formats a camelCase string into a string with normal casing and spaces.
   * @param {string} string
   * @returns {string}
   * @example
   * format('camelCaseText') //returns Camel Case Text
   */
  function format(string) {
    if (typeof string === 'undefined') return undefined;
    const spaced = string.replace(/[A-Z]/g, match => ` ${ match }`);
    return spaced.charAt(0).toUpperCase() + spaced.substr(1);
  }

  /**
   * Represents a cell in a table. If the header prop is set to true,
   * then a table header cell will be used instead of a normal table cell.
   */
  const Cell = ({
  	children, header, onClick, align = 'left',
  	colSpan, headers, rowSpan, scope, className, id, style
  }) => React__default.createElement(header ? 'th' : 'td', {
  	className: classList(className, `align-${ align }`),
  	onClick, colSpan, rowSpan, id, style,
  	scope: header ? scope : undefined,
  	headers: Array.isArray(headers) ? headers.join(' ') : headers
  }, children);

  Cell.propTypes = {
  	children: React.PropTypes.node,
  	align: React.PropTypes.oneOf(['left', 'center', 'right']),
  	header: React.PropTypes.bool,
  	onClick: React.PropTypes.func,
  	colSpan: React.PropTypes.number,
  	rowSpan: React.PropTypes.number,
  	scope: React.PropTypes.oneOf(['row', 'col', 'rowgroup', 'colgroup', 'auto']),
  	headers: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string), React.PropTypes.string]),
  	className: React.PropTypes.string,
  	id: React.PropTypes.string,
  	style: React.PropTypes.object
  };

  /**
   * Used to define attributes of a table column
   */
  class Column {
  	/**
    * @param {Object} props
    * @param {string} props.columnKey - ID for the column, should be unique
    * @param {string} [props.title] - title used in header cell. By default, it
    * is created from formatting the columnKey.
    * @param {string} [props.description] - shown when hovering on header cell
    * @param {string} [props.align=left] - text alignment for the column cells.
    * @param {function} [props.compareFunc] - used for sorting. 
    * Omitting means sorting is disabled for the column.
    * @param {function} props.toElement - used to turn the data into a react
    * @param {function} props.getValue - Used to transform data into a value 
    * for the cell and for sorting
    */
  	constructor(props) {
  		if (typeof props === 'string') props = { columnKey: props };

  		const { title = format(props.columnKey), align = 'left' } = props;
  		const { toElement = Column.defaultToElementFunc } = props;
  		const { getValue = Column.defaultGetValueFunc } = props;

  		let { compareFunc } = props;
  		if (compareFunc && typeof compareFunc !== 'function') //if truthy
  			compareFunc = Column.defaultCompareFunc;

  		Object.assign(this, props, {
  			title, align, toElement, compareFunc, getValue,
  			useSorting: props.compareFunc ? true : false
  		});
  	}

  	get key() {
  		return this.columnKey;
  	}

  	toJSON() {
  		return [...Object.keys(this), 'key'].reduce((obj, key) => {
  			obj[key] = this[key];return obj;
  		}, {});
  	}

  	static defaultToElementFunc(value, props) {
  		return React.createElement(Cell, props, value);
  	}

  	static defaultCompareFunc(a, b) {
  		if (typeof a === 'string' || typeof b === 'string') return String(a).localeCompare(b);else if (typeof a === 'number' || typeof b === 'number') return b - a;else return 0;
  	}

  	static defaultGetValueFunc(rowData, columnKey) {
  		return rowData[columnKey];
  	}
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * A checkbox component. Adds a 'indeterminate' prop, which allows for the
   * indeterminate value of a checkbox to be set. 
   */
  class Checkbox extends React.Component {
  	render() {
  		return React__default.createElement('input', _extends({}, omit(this.props, 'indeterminate'), {
  			type: 'checkbox',
  			ref: checkbox => this._checkbox = checkbox
  		}));
  	}

  	/**
    * Indeterminate must be set manually, so get a ref to the checkbox and
    * apply the indeterminate value if nessecary.
    */
  	setInderminate(flag) {
  		this._checkbox.indeterminate = flag;
  	}

  	componentDidMount() {
  		this.setInderminate(this.props.indeterminate);
  	}

  	componentDidUpdate(prevProps) {
  		const { indeterminate } = this.props;
  		if (indeterminate !== prevProps.indeterminate) this.setInderminate(indeterminate);
  	}

  	static get propTypes() {
  		return {
  			indeterminate: React.PropTypes.bool,
  			checked: React.PropTypes.bool,
  			defaultChecked: React.PropTypes.bool,
  			onChange: React.PropTypes.func,
  			readOnly: React.PropTypes.bool
  		};
  	}

  	shouldComponentUpdate(nextProps) {
  		return this.props !== nextProps;
  	}
  }

  /** An arrow displayed in header cells to indicate sorting direction */
  const SortIcon = ({ active, descending }) => React__default.createElement('i', {
  	className: classList('material-icons md-18 table-sort-icon', { 'sort-active': active }),
  	children: descending ? 'arrow_downward' : 'arrow_upward'
  });
  SortIcon.propTypes = { active: React.PropTypes.bool, descending: React.PropTypes.bool };

  /**
   * A header cell for the table. Two copies of the header text are created, 
   * the first can be truncated for smaller columns and the second is revealed
   * on hover to show the full text, as well as display an icon to indicate 
   * sorting is possible (if enabled).
   */
  const HeaderCell = props => {
  	const { children, description, align, onClick, width } = props;
  	const { useSorting, active } = props;

  	return React__default.createElement(
  		Cell,
  		{ header: true,
  			className: 'th-hoverable',
  			align: align, onClick: onClick,
  			style: !useSorting ? { cursor: 'default' } : undefined
  		},
  		React__default.createElement(
  			'span',
  			{ className: classList('table-cell-normal', { 'hidden': active }),
  				style: width !== undefined ? { width } : undefined
  			},
  			children
  		),
  		React__default.createElement(
  			'span',
  			{ title: description,
  				className: classList(`table-cell-hover align-${ align }`, { 'visible': active })
  			},
  			useSorting && align !== 'left' ? React__default.createElement(SortIcon, props) : null,
  			children,
  			useSorting && align === 'left' ? React__default.createElement(SortIcon, props) : null
  		)
  	);
  };

  HeaderCell.propTypes = {
  	children: React.PropTypes.node.isRequired,
  	description: React.PropTypes.string,
  	align: React.PropTypes.oneOf(['left', 'center', 'right']),
  	onClick: React.PropTypes.func,
  	useSorting: React.PropTypes.bool,
  	active: React.PropTypes.bool,
  	descending: React.PropTypes.bool,
  	width: React.PropTypes.number
  };

  /**
   * The thead element for a table. Columns are built from the column array 
   * that is provided. If selectedLength is provided, a checkbox column is
   * created as well.  
   */
  class Head extends React.Component {
  	static get propTypes() {
  		return {
  			columns: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)).isRequired,
  			selectedLength: React.PropTypes.number,
  			dataLength: props => {
  				if (props.selectedLength !== undefined && typeof props.dataLength !== 'number' && props.dataLength > -1) {
  					return new Error('selectedLength prop is set, ' + 'but dataLength is missing or not a valid number');
  				}
  			},
  			onColumnClick: React.PropTypes.func,
  			onCheckboxChange: React.PropTypes.func,
  			sorting: React.PropTypes.shape({
  				columnKey: React.PropTypes.string,
  				descending: React.PropTypes.bool
  			})
  		};
  	}

  	constructor(props) {
  		super(props);

  		const { onColumnClick } = props;
  		let onClicks = new Map();
  		if (onColumnClick) {
  			for (const { columnKey } of props.columns) onClicks.set(columnKey, () => onColumnClick(columnKey));
  		}
  		this.state = { onClicks };
  	}

  	render() {
  		const { columns, sorting, selectedLength, onCheckboxChange } = this.props;
  		const sortKey = sorting && sorting.columnKey;
  		const descending = sorting && sorting.descending;
  		const allSelected = selectedLength === this.props.dataLength;

  		return React__default.createElement(
  			'thead',
  			null,
  			React__default.createElement(
  				'tr',
  				{ className: 'table-th-row' },
  				selectedLength !== undefined ? React__default.createElement(
  					Cell,
  					{ header: true, align: 'center' },
  					React__default.createElement(Checkbox, {
  						checked: allSelected,
  						indeterminate: selectedLength > 0 && !allSelected,
  						onChange: onCheckboxChange,
  						readOnly: onCheckboxChange ? false : true
  					})
  				) : null,
  				columns.map(({ columnKey, description, title, align, useSorting }) => React__default.createElement(
  					HeaderCell,
  					{ key: columnKey,
  						description: description, align: align,
  						onClick: this.state.onClicks.get(columnKey),
  						useSorting: useSorting,
  						active: useSorting && sortKey == columnKey,
  						descending: useSorting ? descending : undefined
  					},
  					title
  				))
  			)
  		);
  	}
  }

  const stopPropagation = e => e.stopPropagation();

  class Row extends React.Component {
  	constructor(props) {
  		super(props);

  		const { rowKey, onChange } = props;
  		if (onChange) this.onChange = () => onChange(rowKey);
  	}

  	static get propTypes() {
  		return {
  			onChange: React.PropTypes.func,
  			checked: React.PropTypes.bool,
  			rowKey: React.PropTypes.string,
  			showCheckbox: React.PropTypes.bool,
  			className: React.PropTypes.string,
  			children: React.PropTypes.node
  		};
  	}

  	render() {
  		const { className, children, checked, showCheckbox } = this.props;
  		return React__default.createElement(
  			'tr',
  			{ onClick: this.onChange,
  				className: classList({ 'checked': checked }, className),
  				onSelect: stopPropagation
  			},
  			showCheckbox ? this.checkbox() : null,
  			children
  		);
  	}

  	checkbox() {
  		const { checked } = this.props;
  		return React__default.createElement(
  			Cell,
  			{ align: 'center' },
  			React__default.createElement('input', { type: 'checkbox', checked: checked, onChange: this.onChange })
  		);
  	}

  	shouldComponentUpdate(nextProps) {
  		return nextProps !== this.props;
  	}
  }

  /**
   * Used for the body of the table. Rows are generated where the columns
   * are based on the columns provided. The order of the rows can be altered
   * by providing a sortMap, which is a map where the keys correspond to the 
   * row's desired position, and the values correspond to the actual row key in
   * the data map. Rows can be marked as selected using the selected array, where
   * each string in the array corresponds with a key in the data map.
   * @param {Object} props
   * @param {Column[]} props.columns
   * @param {Map<string, Object>} props.data
   * @param {Map<string, string>} props.sortMap
   * @param {Set<string>} props.selected
   * @param {function} onSelect
   */
  class Body extends React.Component {
  	static get propTypes() {
  		return {
  			columns: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)).isRequired,
  			data: React.PropTypes.instanceOf(Map).isRequired,
  			sortMap: React.PropTypes.instanceOf(Map),
  			selected: React.PropTypes.instanceOf(Set),
  			onSelect: React.PropTypes.func
  		};
  	}

  	/** 
    * @returns {Map<number, string>} A map containing the keys from data as 
    * values, with their index set as the key. 
    */
  	static defaultSortMap(data) {
  		let sortMap = new Map(),
  		    i = 0;
  		for (const id of data.keys()) {
  			sortMap.set(i, id);
  			i++;
  		}
  		return sortMap;
  	}

  	render() {
  		const { columns, selected, onSelect, data } = this.props;
  		const { sortMap = Body.defaultSortMap(data) } = this.props;

  		let rows = Array(data.length);

  		for (const [index, rowKey] of sortMap) {
  			const checked = selected && selected.has(rowKey);
  			const rowData = data.get(rowKey);

  			rows[index] = React__default.createElement(
  				Row,
  				_extends({ rowKey, checked }, { showCheckbox: true,
  					onChange: onSelect, key: rowKey
  				}),
  				columns.map(column => {
  					const { toElement, columnKey, getValue } = column;
  					return toElement(getValue(rowData, columnKey), column.toJSON(), rowKey);
  				})
  			);
  		}

  		return React__default.createElement(
  			'tbody',
  			null,
  			rows
  		);
  	}
  }

  /**
   * Example table that uses the table-controls components.
   */
  class Table extends React.Component {
  	static get propTypes() {
  		return {
  			data: React.PropTypes.instanceOf(Map),
  			columns: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)),
  			sorting: React.PropTypes.bool,
  			selection: React.PropTypes.bool
  		};
  	}

  	constructor(props) {
  		super(props);

  		const { sorting, selection } = props;
  		let state = {};
  		if (selection) state.selected = new Set();
  		if (sorting) state.sort = { columnKey: undefined, descending: true };
  		this.state = state;

  		this.onRowSelect = selection ? this.onRowSelect.bind(this) : undefined;
  		this.onColumnCheckboxChange = selection ? this.onColumnCheckboxChange.bind(this) : undefined;
  		this.onColumnClick = sorting ? this.onColumnClick.bind(this) : undefined;
  	}

  	generateSortMap() {
  		const { sort } = this.state;
  		if (!sort) return;
  		const { columnKey, descending } = sort;
  		if (!columnKey) return;

  		const { data } = this.props;
  		const sortColumn = this.props.columns.find(c => c.columnKey === columnKey);

  		const columnData = Array.from(data, ([rowKey, rowData]) => [rowKey, sortColumn.getValue(rowData, columnKey)]);

  		const sortedData = columnData.sort(([, a], [, b]) => sortColumn.compareFunc(a, b));

  		if (!descending) sortedData.reverse();

  		return new Map(sortedData.map(([rowKey], index) => [index, rowKey]));
  	}

  	render() {
  		const { data, columns } = this.props;
  		const { selected, sort } = this.state;

  		return React__default.createElement(
  			'table',
  			null,
  			React__default.createElement(
  				'caption',
  				{ style: { visibility: selected.length > 0 ? 'visible' : 'hidden' } },
  				`${ selected.length } item${ selected.length > 1 ? 's' : '' } selected`
  			),
  			React__default.createElement(Head, { columns: columns,
  				selectedLength: selected ? selected.size : undefined,
  				dataLength: data.size,
  				sorting: sort,
  				onCheckboxChange: this.onColumnCheckboxChange,
  				onColumnClick: this.onColumnClick
  			}),
  			React__default.createElement(Body, _extends({ data, columns, selected }, {
  				sortMap: this.generateSortMap(),
  				onSelect: this.onRowSelect
  			}))
  		);
  	}

  	onRowSelect(rowKey) {
  		const selected = new Set(this.state.selected);
  		if (!selected.has(rowKey)) selected.add(rowKey);else selected.delete(rowKey);
  		this.setState({ selected });
  	}
  	onColumnCheckboxChange() {
  		const { data } = this.props;
  		const { selected } = this.state;
  		if (selected.size === data.size) this.setState({ selected: new Set() });else this.setState({ selected: new Set(data.keys()) });
  	}
  	onColumnClick(columnKey) {
  		const { columnKey: sortKey, descending } = this.state.sort;
  		if (sortKey === columnKey) this.setState({ sort: { columnKey, descending: !descending } });else this.setState({ sort: { columnKey, descending: true } });
  	}
  }

  exports.Head = Head;
  exports['default'] = Body;
  exports.Cell = Cell;
  exports.Column = Column;
  exports.Checkbox = Checkbox;
  exports.Table = Table;

}((this.T = this.T || {}),React));
//# sourceMappingURL=bundle.js.map
