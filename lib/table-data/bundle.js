(function (exports,React) {
	'use strict';

	var React__default = 'default' in React ? React['default'] : React;

	/**
	 * Used to define attributes of a table column
	 */
	class Column {
		/**
	  * @param {ReactElement|string} header - passed columnKey prop. 
	  * If header is a string, it is wrapped in a TH element. 
	  * Otherwise, the element is used as the header. 
	  * @param {ReactElement} cell - passed rowIndex and columnKey props. 
	  * Duplicated for each row.
	  * @param {string} columnKey - used as key for the column, 
	  * and passed to children
	  * @param {string} [align=left] - alignment for the column
	  */
		constructor({ header, cell, columnKey, align = 'left' }) {
			Object.assign(this, { header, cell, columnKey, align });
		}
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
	}

	var _this = undefined;

	/**
	 * Used to display a table created via callbacks. The children passed to this
	 * element define columns and their data. The cell property of the column
	 * is called rowsCount times, and is passed the rowIndex and columnKey.
	 */
	const Table = props => {
		const { children: columns, rowsCount, rowClassNameGetter } = props;
		const { rowKeyGetter, onRowClick, onColumnClick } = props;

		const thead = React.Children.map(columns, col => {
			const { header, columnKey, align } = col;
			const onClick = onColumnClick.bind(_this, columnKey);

			let child;
			if (typeof header == 'function' || typeof header == 'object') child = React.cloneElement(header, { columnKey });else child = header;

			return React__default.createElement(
				'th',
				{ key: columnKey, className: `align-${ align }`,
					onClick: onClick
				},
				child
			);
		});

		let rows = [];
		for (let i = 0; i < rowsCount; i++) {
			const onClick = onRowClick.bind(_this, i);
			rows.push(React__default.createElement(
				'tr',
				{ onClick: onClick,
					className: rowClassNameGetter(i),
					key: rowKeyGetter(i) || i
				},
				React.Children.map(columns, ({ cell, columnKey, align }) => {
					if (typeof cell !== 'string') return React.cloneElement(cell, { rowIndex: i, columnKey });else return React__default.createElement(
						'td',
						{ className: `align-${ align }`, key: columnKey },
						cell
					);
				})
			));
		}

		return React__default.createElement(
			'table',
			omit(props, 'children', 'rowsCount', 'rowClassNameGetter', 'onRowClick'),
			React__default.createElement(
				'thead',
				null,
				thead
			),
			React__default.createElement(
				'tbody',
				null,
				rows
			)
		);
	};

	Table.propTypes = {
		rowsCount: React.PropTypes.number.isRequired,
		rowClassNameGetter: React.PropTypes.func,
		rowKeyGetter: React.PropTypes.func,
		onRowClick: React.PropTypes.func,
		onColumnClick: React.PropTypes.func,
		children: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)), React.PropTypes.instanceOf(Column)]).isRequired
	};

	exports['default'] = Table;
	exports.Column = Column;

}((this.Table = this.Table || {}),React));
//# sourceMappingURL=bundle.js.map
