import React, {Component, PropTypes} from 'react';
import Body, {Column} from '../../lib/table-controls/index.js';

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

		const columns = initialColumns.map(column => {
			const {toElement, columnKey} = column;
			
			return new Column(Object.assign({}, column, {
				toElement: (value, props, rowKey) => {
					if (!props.type && props.type !== 'text' && props.type !== 'number'
					&& props.type !== 'email' && props.type !== 'tel' 
					&& props.type !== 'url') {
						return toElement(value, props, rowKey);
					}
					return toElement(
						<input type={props.type || 'text'}
							value={value}
							onChange={e => this.onInputChange(
								e.target.value, 
								rowKey, 
								columnKey
							)}
							onClick={cancelClick} readOnly={props.readOnly}
							autoComplete={props.autoComplete} disabled={props.disabled}
							inputMode={props.inputMode} list={props.list}
							step={props.step} placeholder={props.placeholder}
							min={props.min} max={props.max} 
							minLength={props.minLength} maxLength={props.maxLength}
							pattern={props.pattern} required={props.required}
							selectionDirection={props.selectionDirection}
							spellCheck={props.spellCheck} tabIndex={props.tabIndex}
						/>
					, props, rowKey)
				}
			}));
		});

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