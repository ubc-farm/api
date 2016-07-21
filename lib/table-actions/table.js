import React, {Component, PropTypes} from 'react';
import Body, {Head, Column} from '../../lib/index.js';
import ActionBar from './action-bar.js';

export default class InvoiceDataBody extends Component {
	get propTypes() {return {
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
		data: PropTypes.instanceOf(Map).isRequired
	}}

	render() {
		return (
			<Body {...this.props} 
				data={this.state.data} 
				columns={this.state.columns}
			/>
		);
	}
}