import test from 'tape';
import DefaultMap from '../defaultmap.js'
import PolygonSet from '../polyset.js'

test('PolygonSet errors', t => {
	const set = new PolygonSet();

	try {
		set.add('some non-polygon object');
		t.fail("PolygonSet should throw if trying to add an object that isn't a polygon");
	} catch (e) {
		t.pass('PolygonSet threw becase the object passed was not a polygon')
	}

	try {
		set.forceAdd('some non-polygon object');
		t.fail("PolygonSet should throw if trying to forceAdd an object that isn't a polygon");
	} catch (e) {
		t.pass('PolygonSet threw becase the object passed was not a polygon')
	}

	const object = {
		equalsExact: (other) => false
	};
	try {
		set.add(object);
	} catch(e) {
		t.fail('PolygonSet should accept objects with an equalsExact function')
	}

	t.end();
})

test('DefaultMap', t => {
	const base = 1.0;
	const otherValues = new Map([
		[3, 20],
		[10, 8]
	]);
	const map = new DefaultMap(base, otherValues);

	t.equal(base, map.get(0), 
		"DefaultMap should return default value if a specific one isn't set");
	t.equal(otherValues.get(3), map.get(3),
		"DefaultMap should return specific values when they exist");
	t.end();
})