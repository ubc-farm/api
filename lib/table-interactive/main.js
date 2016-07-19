import React, {Component, PropTypes} from 'react';
import Table, {Column} from '../../lib/table-data/index.js';
import {classlist as cx} from '../../lib/utils/index.js';

/**
 * Enhances the data table with interactive functionality
 */
export default class InteractiveTable extends Component {
	constructor(props) {
		super(props);

		const {sorting, selection} = props;
		let state = {
			settings: {},
			sort: {
				columnKey: undefined,
				descending: true
			}, 
			selected: []
		};

		if (sorting) {
			state.settings.sort = true;

			if (typeof sorting === 'object' && sorting.columnKey) 
				state.sort.columnKey = sorting.columnKey
			else {
				const {data} = props; let firstColumnKey;
				for (const key in data[0]) {firstColumnKey = key; break;}
				state.sort.columnKey = firstColumnKey;
			}

			if (typeof sorting === 'object' && sorting.descending) 
				state.sort.descending = sorting.descending;
		}

		if (selection) {
			state.settings.selected = true;
			if (Array.isArray(selection)) state.selected = selection;
		}

		this.state = state;
	}

	render() {
		const {data} = this.props;
		const {selected, settings} = this.state;
		const sLength = selected ? selected.length : -1;

		return (
			<section className={cx('interactive-table', this.props.className)}>
				{this.props.children || settings.selected ? 
					<header className='table-header'>
						<div className='table-header-selected'
							style={{
								visibility: selected && sLength>0 ? 'visible': 'hidden'
							}}
						>
							{settings.selected ?
								<span>{sLength} item{sLength>1 ? 's':''} selected</span> 
							: null}
						</div>
						<div className='table-header-main'>{this.props.children}</div>
					</header> 
				: null}
				<Table
					rowsCount={data.length}
					rowClassNameGetter={this.rowClassHelper}
					onRowClick={this.rowClickHelper}
					onColumnClick={this.columnClickHelper}
					children={[
						new Column({
							
						})
					]}
				/>
			</section>
		)
	}

	rowClassHelper(rowIndex) {
		if (this.state.selected.includes(rowIndex)) return 'row-selected';
	}
	rowClickHelper(rowIndex) {
		const {selected, settings} = this.state;
		if (!settings.selected) return;

		let clone = selected.slice();
		if (selected.includes(rowIndex)) {
			clone.splice(clone.indexOf(rowIndex), 1);
		} else {
			clone.push(rowIndex);
		}
		this.setState({selected: clone});
	}

	columnClickHelper(columnKey) {
		const {sort, settings} = this.state;
		if (!settings.sort) return;

		if (sort.columnKey == columnKey) {
			this.setState({
				sort: Object.assign({}, sort, {
					descending: !sort.descending
				})
			});
		} else {
			this.setState({
				sort: {columnKey, descending: true}
			});
		}			
	}
}

InteractiveTable.propTypes = {
	selection: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.int),
		PropTypes.bool
	]),
	sorting: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.shape({columnKey: PropTypes.string}),
		PropTypes.shape({descending: PropTypes.bool}),
		PropTypes.shape({
			columnKey: PropTypes.string,
			descending: PropTypes.bool
		})
	]),

	data: PropTypes.arrayOf(PropTypes.object).isRequired,

	className: PropTypes.string,
	children: PropTypes.node
}