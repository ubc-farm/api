import React, { Component, PropTypes } from 'react';

import {domReady} from 'utils.js';
import ReactDOM from 'react-dom';

export default class InventoryScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewing: this.props.today
		}
		this.changeView = this.changeView.bind(this);
		this.onArrowClick = this.onArrowClick.bind(this);
	}

	render() {
		return (
			<div>
				<Month month={this.state.viewing} today={this.props.today}
				       onClick={this.changeView}
							 onArrowClick={this.onArrowClick}/>
				{/*<Filter></Filter>*/}
				<section className='agenda'>
					{this.props.children}
				</section>
			</div>
		)
	}

	static get defaultProps() {
		
	}
}

domReady.then(() => {
	return ReactDOM.render(
		<InventoryScreen/>
	, document.getElementById('main'))
})