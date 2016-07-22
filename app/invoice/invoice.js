import React, {Component, PropTypes} from 'react';
import {id} from '../../lib/utils/index.js';
import DatePicker from './date-input.js';
import InvoiceTable from './table.js';

export class Invoice extends Component {
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

		this.state = {
			data: props.initialData,
			selected: new Set(),
			customerDetails: ''
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

	render() {
		const {customerDetails, data} = this.state;
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
								defaultValue={this.props.deliveryDate}
							/>
						</label>

						<label htmlFor='channel'>Channel</label>
						<select id='channel' name='channel'>
							<option value='csa'>CSA</option>
							<option value='restaurants'>Restaurants</option>
						</select>

						<label htmlFor='notes'>Notes</label>
						<textarea id='notes' name='notes'/>
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
						<label>
							<span>Invoice #:</span>
							<input type='number' name='invoiceNumber'/>
						</label>

						<label>
							<span>Date:</span>
							<DatePicker name='orderDate' 
								defaultValue={this.props.orderDate}
							/>
						</label>

						<label>
							<span>Balance Due (CAD):</span>
						</label>
					</div>
				</div>

				<section>
					<ActionBar/>
					<InvoiceTable data={data}
						
					/>
				</section>
			</form>
		)
	}
}