import test from 'tape';
import {id} from '../'

test('Unique ID generation', t => {
	let generated = [];
	for (let i = 0; i < 100; i++) {
		const newId = id();
		if (generated.indexOf(newId) > 0) {
			t.fail('Generated non-unique id ' + newId);
			break;
		}
		generated.push(newId);
	}
	t.end();
})