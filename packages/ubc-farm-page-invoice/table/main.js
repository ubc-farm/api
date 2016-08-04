import {createElement as h, Component, PropTypes} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {
	Head, Body, Column,
	generateSortMap
} from '../../react-table/index.js';
import {toggleRowSelection, toggleSelectAll} from '../store/actions.js';
import columnList from '../columnlist.js'
import TotalFooter from './footer.js';
import ActionBar from './toolbar.js';
import {AddRow, DeleteSelected} from './toolbar-buttons.js';

class InvoiceTable extends Component {
	static get propTypes() {return {
		data: PropTypes.instanceOf(Map),
		selected: PropTypes.instanceOf(Set),
		onColumnCheckboxChange: PropTypes.func,
		onRowSelect: PropTypes.func,
		onInputChange: PropTypes.func,
		columns: PropTypes.arrayOf(PropTypes.instanceOf(Column))
	}}

	constructor(props) {
		super(props);
		this.handleColumnClick = this.handleColumnClick.bind(this);

		this.state = {
			sort: {column: undefined, descending: true}
		};
	}

	generateSortMap() {
		const {column, descending} = this.state.sort;
		if (!column) return;

		return generateSortMap(this.props.data, column, descending);
	}

	/** Changes table sorting when the user clicks on a column */
	handleColumnClick(column) {
		const {column: sortColumn, descending} = this.state.sort;
		if (sortColumn === column) 
			this.setState({sort: {column, descending: !descending}});
		else 
			this.setState({sort: {column, descending: true}});
	}

	render() {
		const {data, selected, columns} = this.props;
		const {sort} = this.state;

		return (
			<table className='invoice-table'>
				<ActionBar selectedLength={this.props.selected.size}>
					<AddRow />
					<DeleteSelected />
				</ActionBar>
				<Head columns={columns} sorting={sort}
					selectedLength={selected.size} dataLength={data.size}
					onCheckboxChange={this.props.onColumnCheckboxChange}
					onColumnClick={this.handleColumnClick}
				/>
				<Body {...{data, columns, selected}}
					sortMap={this.generateSortMap()}
					onSelect={this.props.onRowSelect}
				/>
				<TotalFooter />
			</table>
		);
	}
}

export default connect(
	({data, selected}) => ({
		columns: columnList,
		data, selected
	}),
	dispatch => ({
		onColumnCheckboxChange: () => dispatch(toggleSelectAll()),
		onRowSelect: rowKey => dispatch(toggleRowSelection(rowKey))
	}),
	undefined,
	{pure: false}
)(InvoiceTable);