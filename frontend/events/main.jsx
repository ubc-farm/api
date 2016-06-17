import React, { Component, PropTypes } from 'react';

import Month from 'elements/time/month.js';
import Filter from 'elements/form/filter.js';
import EventCard from 'elements/info/event.js';

export default class EventMainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewing: this.props.today
		}
		this.changeView = this.changeView.bind(this);
		this.onArrowClick = this.onArrowClick.bind(this);
	}

	changeView(day, month, year) {
		if (!year) year = this.state.viewing.getFullYear();
		if (!month && month !== 0) month = this.state.viewing.getMonth();
		if (!day) day = this.state.viewing.getDay();
		this.setState({viewing: new Date(year, month, day)})
	}

	onArrowClick(dir) {
		console.log(dir);
		console.log(this.state.viewing);
		this.changeView(null, this.state.viewing.getMonth() + dir)
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
		return {
			today: new Date()
		}
	}
}