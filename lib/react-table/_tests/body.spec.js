import test from 'tape';
import {shallow} from 'enzyme';
import TBody, {TableBodyRows, TableRowCells} from '../body.js';

function isIterable(thing) {
	if (thing == null) return false;
	return typeof thing[Symbol.iterator] === 'function';
}

test('TableRowCells', t => {
	const emptyCells = TableRowCells({
		row: new Map(),
		columns: new Set()
	})
	t.assert(isIterable(emptyCells), 'returns an iterator');

	const someObject = {};
	const smallRow = TableRowCells({
		row: new Map([['apple', <div/>], ['pear', <span/>]]),
		columns: new Set(['apple', someObject])
	})
	const result = [...smallRow];
	t.equal(result.length, 2, 'same length as that of columns');

	const wrapper = shallow(result[0])
	t.assert(wrapper.equals(<td><div/></td>),
		'returns the element for the column, wrapped in a td element');
	t.equal(wrapper.key(), 'apple', 'has key based on column');

	const empty = shallow(result[1]);
	t.assert(empty.equals(<td/>),
		`returns an empty table cell when the column doesn't appear in the map`);
	t.equal(empty.key(), someObject,
		'works with non-string keys');
})