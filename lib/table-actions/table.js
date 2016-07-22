import React, {Component, PropTypes} from 'react';
import Body from '../../lib/table-controls/index.js';

const cancelClick = e => e.stopPropagation();

export default class InvoiceDataBody extends Component {
	static get propTypes() {
		return Object.assign({}, Body.propTypes, {
			onDataChange: PropTypes.func
		})
	}

	constructor(props) {
		super(props);
		const {columns: initialColumns} = props;

		this.onInputChange = this.onInputChange.bind(this);

		const columns = initialColumns.map(column => Object.assign({}, column, {
			toElement: (value, props, rowKey) => {
				return column.toElement(
					<input type='text' {...props}
						value={value}
						onChange={e => this.onInputChange(
							e.target.value, 
							rowKey, 
							column.columnKey
						)}
						onClick={cancelClick}
					/>
				, props);
			}
		}))

		this.state = {columns};
	} 

	onInputChange(value, rowKey, columnKey) {
		const {data, onDataChange} = this.props;

		let newData = new Map();
		for (const [thisRowKey, thisRowData] of data) {
			if (rowKey !== thisRowKey) newData.set(thisRowKey, thisRowData);
			else {
				newData.set(rowKey, Object.assign({}, thisRowData, {
					[columnKey]: value
				}));
			}
		}
		
		onDataChange(newData);
	}

	render() {
		return <Body {...this.props} columns={this.props.columns}/>;
	}
}