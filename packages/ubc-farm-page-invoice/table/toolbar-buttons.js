import {createElement as h} from 'react'; /** @jsx h */
import {connect} from 'react-redux';
import {addRow, removeSelected} from '../store/actions.js';

/** Button to add a row to the table */
let AddRow = ({dispatch}) => (
	<button type='button' onClick={() => dispatch(addRow())}>
		Add Item
	</button>
);
AddRow = connect()(AddRow);

/** Button to deleted the selected rows in the table */
let DeleteSelected = ({dispatch}) => (
	<button type='button' onClick={() => dispatch(removeSelected())}>
		Remove Selected Items
	</button>
);
DeleteSelected = connect()(DeleteSelected);

export {AddRow, DeleteSelected};