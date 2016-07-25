import React, {Component, PropTypes} from 'react';
import {id as randomId} from '../../lib/utils/index.js';
import DatePicker from './date-input.js';
import InvoiceTable from './table.js';
import ActionBar from './action-bar.js'

export default class Invoice extends Component {
	static get propTypes() {return {
		initialData: PropTypes.instanceOf(Map),
		orderDate: PropTypes.instanceOf(Date),
		deliveryDate: PropTypes.instanceOf(Date),
		customerList: PropTypes.arrayOf(PropTypes.string)
	}}

	static get defaultProps() {return {
		initialData: new Map()
	}}

	constructor(props) {
		super(props);

		this.changeCustomerDetails = this.changeCustomerDetails.bind(this);
		this.updateData = data => this.setState({data});
		this.updateSelected = selected => this.setState({selected});

		this.deleteSelected = this.deleteSelected.bind(this);
		this.addBlankRow = this.addBlankRow.bind(this);

		this.state = {
			data: props.initialData,
			selected: new Set(),
			customerDetails: '',
			orderDate: props.orderDate || new Date(Date.now()),
			deliveryDate: props.deliveryDate || new Date(Date.now())
		}
	}

	/**
	 * @todo: Lookup details using the value
	 */
	changeCustomerDetails(e) {
		this.setState({
			customerDetails: e.target.value
		})
	}

	deleteSelected() {
		const {selected, data} = this.state;
		let newData = new Map();
		for (const [key, value] of data) {
			if (!selected.has(key)) newData.set(key, value);
		}
		this.setState({data: newData, selected: new Set()});
	}

	addBlankRow() {
		let data = new Map(this.state.data);
		data.set(randomId(), {});
		this.setState({data});
	}

	render() {
		const {customerDetails, data, selected} = this.state;
		const {customerList} = this.props;

		return (
			<form className='invoice'>
				<div className='row'>
					<p className='farm-address left'>
						UBC Farm<br/>
						2357 Main Maill<br/>
						Vancouver BC  V6T 1Z4<br/>
						Canada<br/>
						Phone: 604-822-5092
					</p>

					<fieldset className='internal-data right'>
						<label>
							Delivery Date
							<DatePicker name='deliveryDate' 
								value={this.state.deliveryDate}
							/>
						</label>

						<div className='row'>
							<div className='left channel'>
								<label htmlFor='channel'>Channel</label>
								<select id='channel' name='channel'>
									<option value='csa'>CSA</option>
									<option value='restaurants'>Restaurants</option>
								</select>
							</div>

							<div className='right notes'>
								<label htmlFor='notes'>Notes</label>
								<textarea id='notes' name='notes'/>
							</div>
						</div>
					</fieldset>
				</div>
				<div className='row'>
					<div className='customer left'>
						<label htmlFor='customer'>Customer</label>
						<input id='customer' name='customer'
							list={customerList ? 'customer-list' : undefined}
							onChange={this.changeCustomerDetails}
						/>
						<p>{customerDetails}</p>
						{customerList ?
							<datalist id='customer-list'>
								{customerList.map(c => <option value={c} key={c}/>)}
							</datalist>
						: null}
					</div>

					<div className='invoice-details right'>
						<label className='details-row'>
							<span className='detail-cell detail-header'>Invoice #:</span>
							<input type='number' 
								name='invoiceNumber' 
								className='detail-cell' 
								defaultValue={Math.ceil(Math.random() * 1e7)}
							/>
						</label>

						<label className='details-row'>
							<span className='detail-cell detail-header'>Date:</span>
							<DatePicker name='orderDate' className='detail-cell' 
								value={this.state.orderDate}
							/>
						</label>

						<label className='details-row'>
							<span className='detail-cell detail-header'>
								Balance Due (CAD):
							</span>
							<span className='detail-cell'/>
						</label>
					</div>
				</div>

				<section>
					<ActionBar selectedLength={selected.size}>
						<button type='button' onClick={this.addBlankRow}>Add Item</button>
						<button type='button'
							onClick={this.deleteSelected}
						>Delete Selected Items</button>
					</ActionBar>
					<InvoiceTable data={data}
						selected={selected}
						onDataChange={this.updateData}
						onSelectionChange={this.updateSelected}
					/>
				</section>
			</form>
		)
	}
}