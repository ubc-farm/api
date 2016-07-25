var Invoice = (function (React) {
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
   * Generate unique IDs. Guaranteed to be unique when compared to other strings
   * generated by this function. The strings are complex enough that they 
   * shouldn't be accidentally duplicated by hand.
   * 
   * Math.random should be unqiue because of its seeding algorithm.
   * Convert it to base 36 (numbers + letters), and grab the first 9 characters
   * after the decimal.
   * 
   * @returns {string}
   * @see https://gist.github.com/gordonbrander/2230317
   * @alias module:lib/utils.id
   */
  const id = () => '_' + Math.random().toString(36).substr(2, 9);

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
   * @type {Object}
   * @property {string[]} months
   * @property {string[]} weeks
   */
  const long = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weeks: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
  };

  /**
   * @type {Object}
   * @property {string[]} months
   * @property {string[]} weeks
   */
  const short = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  };

  const { months } = long;const shortMonths = short.months;

  const dateGets = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds'];

  const labels$1 = dateGets.map(f => f.substr(3).toLowerCase()).map(f => f.endsWith('s') ? f.slice(-1) : f);

  /**
   * Returns a date string containing year, month, and date.
   * @param {Date} date
   * @returns {string} in format YYYY-MM-DD
   * @example
   * const date = new Date(1969, 07, 16);
   * toIsoDate(date) // returns 1969-07-16
   */
  function toRfcDate(date) {
    if (!(date instanceof Date)) throw new TypeError(`date parameter ${ date } is not a Date object`);
    return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
  }

  class DatePicker extends React.Component {
  	static get propTypes() {
  		return {
  			value: React.PropTypes.instanceOf(Date).isRequired,
  			onChange: React.PropTypes.func.isRequired,
  			className: React.PropTypes.string
  		};
  	}

  	constructor(props) {
  		super(props);

  		this.onInputChange = this.onInputChange.bind(this);
  		this.onInputFocus = this.onInputFocus.bind(this);
  		this.onInputBlur = this.onInputBlur.bind(this);
  		this.onYearHeaderChange = this.onYearHeaderChange.bind(this);

  		this.state = {
  			open: false
  		};
  	}

  	onInputChange(e) {
  		console.log(e.target.value);
  		this.props.onChange(new Date(e.target.value), e);
  	}
  	onInputFocus(e) {
  		this.setState({ open: true });e.preventDefault();
  	}
  	onInputBlur(e) {
  		this.setState({ open: false });e.preventDefault();
  	}
  	onYearHeaderChange(e) {
  		let value = new Date(this.props.value);
  		value.setFullYear(e.target.value);
  		return this.props.onChange(value, e);
  	}

  	render() {
  		const { value, className } = this.props;
  		const { open, selectingDate } = this.state;
  		return React__default.createElement(
  			'span',
  			{ className: 'date-picker-container' },
  			React__default.createElement('input', { className: classList('date-picker-input', className),
  				type: 'text', readOnly: true,
  				onFocus: this.onInputFocus,
  				onBlur: this.onInputBlur,
  				value: long.months[value.getMonth()] + ` ${ value.getDate() }, ${ value.getFullYear() }`
  			}),
  			React__default.createElement(
  				'div',
  				{ className: classList('date-picker', { open }) },
  				React__default.createElement(
  					'time',
  					{ className: 'date-picker-header', dateTime: toRfcDate(value) },
  					React__default.createElement('input', { className: 'date-picker-year',
  						value: value.getFullYear(), type: 'text',
  						inputMode: 'numeric'
  						/* Update this if you ever plan to use this date picker 
        in the year 3,000. */
  						, pattern: '^[12]\\d{3}$',
  						onChange: this.onYearHeaderChange
  					}),
  					React__default.createElement(
  						'span',
  						{
  							className: classList('date-picker-date', { 'highlight': selectingDate })
  						},
  						short.weeks[value.getDay()],
  						', ',
  						short.months[value.getMonth()],
  						' ',
  						value.getDate()
  					)
  				),
  				React__default.createElement(
  					'div',
  					{ className: 'date-picker-selector' },
  					React__default.createElement(
  						'h3',
  						null,
  						long.months[value.getMonth()]
  					)
  				)
  			)
  		);
  	}
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
  		Object.freeze();
  	}

  	get key() {
  		return this.columnKey;
  	}

  	toJSON() {
  		return [...Object.keys(this), 'key'].reduce((obj, key) => {
  			obj[key] = this[key];return obj;
  		}, {});
  	}

  	static defaultToElementFunc(value, props, rowKey) {
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
  				className: classList({ 'checked': checked }, className)
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

  function generateSortMap(data, sortColumn, descending = true) {
  	const columnData = Array.from(data, ([rowKey, rowData]) => [rowKey, sortColumn.getValue(rowData, sortColumn.columnKey)]);

  	const sortedData = columnData.sort(([, a], [, b]) => sortColumn.compareFunc(a, b));

  	if (!descending) sortedData.reverse();

  	const sortMap = sortedData.map(([rowKey], index) => [index, rowKey]);
  	return new Map(sortMap);
  }

  /**
   * Class used to represent money. 
   * Internally represents its value as an integer, to avoid float math issues
   * @extends Number
   * @alias module:lib/money.default
   * @typicalname money
   */
  class Money extends Number {
  	/**
    * @param {number|number[]} money - if an array, 
    * uses money[0] as dollars and money[1] as cents. If a float, try to convert
    * it to an integer representing cents (multiply by 100).
    * @param {Object} [options]
    * @param {boolean} [options.convert=true] - if false, parse the money
    * integer as dollars instead of cents.
    */
  	constructor(money, { convert = true } = {}) {
  		let dollars,
  		    cents = 0;
  		if (Array.isArray(dollars)) [dollars, cents] = money;else if (convert && Number.isInteger(money) || money instanceof Money) {
  			super(money);
  			return;
  		} else {
  			[dollars, cents] = String(money).split('.');
  			dollars = parseInt(dollars, 10);

  			const centStr = cents;
  			if (cents === undefined) cents = 0;else {
  				cents = parseInt(centStr, 10);
  				if (centStr.length === 1) cents *= 10;
  			}

  			const negativeDollars = 1 / dollars < 0;
  			if (negativeDollars) cents *= -1;
  		}

  		super(dollars * 100 + cents);
  	}

  	/** @type {number} */
  	get dollars() {
  		return Math.trunc(this / 100);
  	}
  	/** @type {number} */
  	get cents() {
  		return this - this.dollars * 100;
  	}

  	/**
    * Convert the money into a string
    * @param {boolean} [opts.dollarSign=true] if true, prepends a dollar sign 
    * to the string
    * @param {boolean} [opts.useMinusSign=false] normally negative amounts are
    * wrapped in parenthesis. If useMinusSign is true, a negative sign will
    * be prefixed to the string instead
    * @param {string} [opts.currency=USD] currency code to use
    * @param {string} [opts.currencyDisplay=symbol] currency style to use
    * @param {boolean} [opts.useGrouping=true] wheter or not to 
    * use thousands seperators
    * @returns {string}
    */
  	toString({
  		dollarSign = true,
  		useMinusSign = false,
  		currency = 'USD',
  		currencyDisplay,
  		useGrouping
  	} = {}) {
  		let value = this.toFloat();const negative = value < 0;
  		if (!useMinusSign && negative) value = Math.abs(value);

  		let str;
  		if (dollarSign) {
  			str = value.toLocaleString(undefined, { style: 'currency', currency, currencyDisplay, useGrouping });
  		} else {
  			str = value.toLocaleString(undefined, { style: 'decimal', minimumFractionDigits: 2, useGrouping });
  		}

  		if (useMinusSign || !negative) return str;else return `(${ str })`;
  	}

  	/**
    * Convert the money into a float instead of an integer
    */
  	toFloat() {
  		return this / 100;
  	}

  	/**
    * Checks if the given money is not a number. This function avoids the 
    * coersion used by the global isNaN function, but Number.isNaN doesn't work
    * properly with number extensions like Money. 
    * @returns {boolean} 
    */
  	static isNaN(money) {
  		return Number.isNaN(money.valueOf());
  	}
  }

  const item = {
  	columnKey: 'item',
  	compareFunc: true
  };

  const description = {
  	columnKey: 'description',
  	compareFunc: true
  };

  const unitCost = {
  	columnKey: 'unitCost',
  	title: 'Unit Cost ($)',
  	description: 'Cost per unit of this item',
  	getValue(rowData, columnKey) {
  		const cents = rowData[columnKey];
  		if (cents !== undefined) return new Money(cents);
  	},
  	compareFunc(a = 0, b = 0) {
  		return b - a;
  	},
  	align: 'right'
  };

  const quantity = {
  	columnKey: 'quantity',
  	compareFunc: true,
  	align: 'right',
  	type: 'number',
  	step: 'any'
  };

  const price = {
  	columnKey: 'price',
  	title: 'Price ($)',
  	getValue(rowData) {
  		const total = rowData.unitCost * rowData.quantity;
  		if (!Money.isNaN(total)) return new Money(total);
  	},
  	compareFunc(a = 0, b = 0) {
  		return b - a;
  	},
  	toElement(value, props) {
  		return React__default.createElement(
  			Cell,
  			props,
  			value.toString()
  		);
  	},
  	align: 'right'
  };

  /** @returns {Column} copy of object with the specified extra properties */
  const clone = (from, ...extra) => new Column(Object.assign({}, from, ...extra));

  function invoiceColumns(onChangeCallback) {
  	function getOnChange(rowKey, column) {
  		return e => {
  			e.stopPropagation();
  			onChangeCallback(e, rowKey, column.columnKey);
  		};
  	}

  	const stop = e => e.stopPropagation();

  	return [clone(item, { toElement(value, props, rowKey) {
  			const onChange = getOnChange(rowKey, item);
  			return React__default.createElement(
  				Cell,
  				_extends({}, props, { header: true, scope: 'row' }),
  				React__default.createElement('input', { type: 'text', spellCheck: true,
  					placeholder: 'Squash, kg',
  					value: value,
  					onChange: onChange,
  					onClick: stop,
  					className: 'input-plain invoice-table-input'
  				})
  			);
  		} }), clone(description, { toElement(value, props, rowKey) {
  			const onChange = getOnChange(rowKey, description);
  			return React__default.createElement(
  				Cell,
  				props,
  				React__default.createElement('input', { type: 'text', spellCheck: true,
  					placeholder: 'Squash variety 2, kg',
  					value: value,
  					onChange: onChange,
  					onClick: stop,
  					className: 'input-plain invoice-table-input'
  				})
  			);
  		} }), clone(unitCost, { toElement(value, props, rowKey) {
  			const onChange = e => {
  				e.stopPropagation();
  				let fakeEvent = { target: { value: undefined } };
  				fakeEvent.target.value = new Money(e.target.value, { convert: false });
  				onChangeCallback(fakeEvent, rowKey, unitCost.columnKey);
  			};
  			return React__default.createElement(
  				Cell,
  				props,
  				React__default.createElement('input', { type: 'number',
  					placeholder: '2.99',
  					value: value.toString({ dollarSign: false, useMinusSign: true }),
  					onChange: onChange,
  					step: 0.01,
  					onClick: stop,
  					className: 'input-plain invoice-table-input',
  					style: { maxWidth: '5em' }
  				})
  			);
  		} }), clone(quantity, { toElement(value, props, rowKey) {
  			const onChange = getOnChange(rowKey, quantity);
  			return React__default.createElement(
  				Cell,
  				props,
  				React__default.createElement('input', { type: 'number',
  					placeholder: '25',
  					value: value,
  					onChange: onChange,
  					step: 'any',
  					onClick: stop,
  					className: 'input-plain invoice-table-input',
  					style: { maxWidth: '5em' }
  				})
  			);
  		} }), clone(price)];
  }

  class InvoiceTable extends React.Component {
  	static get propTypes() {
  		return {
  			data: React.PropTypes.instanceOf(Map),
  			selected: React.PropTypes.instanceOf(Set),
  			onDataChange: React.PropTypes.func,
  			onSelectionChange: React.PropTypes.func
  		};
  	}

  	constructor(props) {
  		super(props);
  		this.onColumnCheckboxChange = this.onColumnCheckboxChange.bind(this);
  		this.onColumnClick = this.onColumnClick.bind(this);
  		this.onRowSelect = this.onRowSelect.bind(this);
  		this.generateSortMap = this.generateSortMap.bind(this);

  		this.state = {
  			sort: {
  				columnKey: undefined,
  				descending: true
  			},
  			columns: invoiceColumns(this.onInputChange.bind(this))
  		};
  	}

  	generateSortMap() {
  		const { columnKey, descending } = this.state.sort;
  		if (!columnKey) return;

  		const { data } = this.props;
  		const sortColumn = this.state.columns.find(c => c.columnKey === columnKey);
  		return generateSortMap(data, sortColumn, descending);
  	}

  	render() {
  		const { data, selected } = this.props;
  		const { columns, sort } = this.state;

  		return React__default.createElement(
  			'table',
  			{ className: 'invoice-table' },
  			React__default.createElement(Head, { columns: columns, sorting: sort,
  				selectedLength: selected.size, dataLength: data.size,
  				onCheckboxChange: this.onColumnCheckboxChange,
  				onColumnClick: this.onColumnClick
  			}),
  			React__default.createElement(Body, _extends({ data, columns, selected }, {
  				sortMap: this.generateSortMap(),
  				onSelect: this.onRowSelect
  			}))
  		);
  	}

  	onColumnClick(columnKey) {
  		const { columnKey: sortKey, descending } = this.state.sort;
  		if (sortKey === columnKey) this.setState({ sort: { columnKey, descending: !descending } });else this.setState({ sort: { columnKey, descending: true } });
  	}

  	onRowSelect(rowKey) {
  		const { onSelectionChange } = this.props;
  		const selected = new Set(this.props.selected);
  		if (!selected.has(rowKey)) return onSelectionChange(selected.add(rowKey));else {
  			selected.delete(rowKey);
  			return onSelectionChange(selected);
  		}
  	}
  	onColumnCheckboxChange() {
  		const { selected, data, onSelectionChange } = this.props;
  		if (selected.size === data.size) return onSelectionChange(new Set());else return onSelectionChange(new Set(data.keys()));
  	}

  	onInputChange(event, rowKey, columnKey) {
  		const data = new Map(this.props.data);
  		let rowData = data.get(rowKey);

  		rowData = Object.assign({}, rowData, {
  			[columnKey]: event.target.value
  		});
  		data.set(rowKey, rowData);
  		return this.props.onDataChange(data);
  	}
  }

  /**
   * A table caption that toggles between 2 possible children depending on
   * selectedLength. Children must be an array of two items: the first is
   * normally displayed, and the second is displayed instead when items
   * are selected.
   */
  const ActionBar = ({ children: [standard, selected], selectedLength = 0 }) => React__default.createElement(
  	'header',
  	{ className: 'table-actions-container' },
  	React__default.createElement(
  		'section',
  		{
  			className: classList('table-actions', 'table-actions-standard', selectedLength === 0 ? 'visible' : 'hidden')
  		},
  		standard
  	),
  	React__default.createElement(
  		'section',
  		{
  			className: classList('table-actions', 'table-actions-selected', selectedLength > 0 ? 'visible' : 'hidden')
  		},
  		React__default.createElement(
  			'span',
  			{ className: 'selected-count' },
  			`${ selectedLength } item${ selectedLength > 1 ? 's' : '' } selected`
  		),
  		selected
  	)
  );

  ActionBar.propTypes = {
  	children: React.PropTypes.arrayOf(React.PropTypes.node),
  	selectedLength: React.PropTypes.number
  };

  class Invoice extends React.Component {
  	static get propTypes() {
  		return {
  			initialData: React.PropTypes.instanceOf(Map),
  			orderDate: React.PropTypes.instanceOf(Date),
  			deliveryDate: React.PropTypes.instanceOf(Date),
  			customerList: React.PropTypes.arrayOf(React.PropTypes.string)
  		};
  	}

  	static get defaultProps() {
  		return {
  			initialData: new Map()
  		};
  	}

  	constructor(props) {
  		super(props);

  		this.changeCustomerDetails = this.changeCustomerDetails.bind(this);
  		this.updateData = data => this.setState({ data });
  		this.updateSelected = selected => this.setState({ selected });

  		this.state = {
  			data: props.initialData,
  			selected: new Set(),
  			customerDetails: '',
  			orderDate: props.orderDate || new Date(Date.now()),
  			deliveryDate: props.deliveryDate || new Date(Date.now())
  		};
  	}

  	/**
    * @todo: Lookup details using the value
    */
  	changeCustomerDetails(e) {
  		this.setState({
  			customerDetails: e.target.value
  		});
  	}

  	addRow(row, id$$ = id()) {
  		let newData = new Map(this.state.data);
  		newData.set(id$$, row);
  		this.setState({ data: newData });
  	}

  	deleteRow(id$$) {
  		let newData = new Map(this.state.data);
  		newData.delete(id$$);
  		this.setState({ data: newData });
  	}

  	render() {
  		const { customerDetails, data, selected } = this.state;
  		const { customerList } = this.props;

  		return React__default.createElement(
  			'form',
  			{ className: 'invoice' },
  			React__default.createElement(
  				'div',
  				{ className: 'row' },
  				React__default.createElement(
  					'p',
  					{ className: 'farm-address left' },
  					'UBC Farm',
  					React__default.createElement('br', null),
  					'2357 Main Maill',
  					React__default.createElement('br', null),
  					'Vancouver BC  V6T 1Z4',
  					React__default.createElement('br', null),
  					'Canada',
  					React__default.createElement('br', null),
  					'Phone: 604-822-5092'
  				),
  				React__default.createElement(
  					'fieldset',
  					{ className: 'internal-data right' },
  					React__default.createElement(
  						'label',
  						null,
  						'Delivery Date',
  						React__default.createElement(DatePicker, { name: 'deliveryDate',
  							value: this.state.deliveryDate
  						})
  					),
  					React__default.createElement(
  						'div',
  						{ className: 'row' },
  						React__default.createElement(
  							'div',
  							{ className: 'left channel' },
  							React__default.createElement(
  								'label',
  								{ htmlFor: 'channel' },
  								'Channel'
  							),
  							React__default.createElement(
  								'select',
  								{ id: 'channel', name: 'channel' },
  								React__default.createElement(
  									'option',
  									{ value: 'csa' },
  									'CSA'
  								),
  								React__default.createElement(
  									'option',
  									{ value: 'restaurants' },
  									'Restaurants'
  								)
  							)
  						),
  						React__default.createElement(
  							'div',
  							{ className: 'right notes' },
  							React__default.createElement(
  								'label',
  								{ htmlFor: 'notes' },
  								'Notes'
  							),
  							React__default.createElement('textarea', { id: 'notes', name: 'notes' })
  						)
  					)
  				)
  			),
  			React__default.createElement(
  				'div',
  				{ className: 'row' },
  				React__default.createElement(
  					'div',
  					{ className: 'customer left' },
  					React__default.createElement(
  						'label',
  						{ htmlFor: 'customer' },
  						'Customer'
  					),
  					React__default.createElement('input', { id: 'customer', name: 'customer',
  						list: customerList ? 'customer-list' : undefined,
  						onChange: this.changeCustomerDetails
  					}),
  					React__default.createElement(
  						'p',
  						null,
  						customerDetails
  					),
  					customerList ? React__default.createElement(
  						'datalist',
  						{ id: 'customer-list' },
  						customerList.map(c => React__default.createElement('option', { value: c, key: c }))
  					) : null
  				),
  				React__default.createElement(
  					'div',
  					{ className: 'invoice-details right' },
  					React__default.createElement(
  						'label',
  						{ className: 'details-row' },
  						React__default.createElement(
  							'span',
  							{ className: 'detail-cell detail-header' },
  							'Invoice #:'
  						),
  						React__default.createElement('input', { type: 'number',
  							name: 'invoiceNumber',
  							className: 'detail-cell',
  							defaultValue: Math.ceil(Math.random() * 1e7)
  						})
  					),
  					React__default.createElement(
  						'label',
  						{ className: 'details-row' },
  						React__default.createElement(
  							'span',
  							{ className: 'detail-cell detail-header' },
  							'Date:'
  						),
  						React__default.createElement(DatePicker, { name: 'orderDate', className: 'detail-cell',
  							value: this.state.orderDate
  						})
  					),
  					React__default.createElement(
  						'label',
  						{ className: 'details-row' },
  						React__default.createElement(
  							'span',
  							{ className: 'detail-cell detail-header' },
  							'Balance Due (CAD):'
  						),
  						React__default.createElement('span', { className: 'detail-cell' })
  					)
  				)
  			),
  			React__default.createElement(
  				'section',
  				null,
  				React__default.createElement(
  					ActionBar,
  					{ selectedLength: selected.size },
  					React__default.createElement(
  						'button',
  						{ onClick: () => this.addRow({})
  						},
  						'Add Item'
  					),
  					React__default.createElement(
  						'button',
  						null,
  						'Delete Selected Items'
  					)
  				),
  				React__default.createElement(InvoiceTable, { data: data,
  					selected: selected,
  					onDataChange: this.updateData,
  					onSelectionChange: this.updateSelected
  				})
  			)
  		);
  	}
  }

  return Invoice;

}(React));
//# sourceMappingURL=bundle.js.map
