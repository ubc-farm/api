import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import Checkbox from './checkbox.js';

test('Checkbox', t => {
	const basic = shallow(<Checkbox/>);
	
	t.assert(
		basic.find('label').length > 0,
		'Checkbox has a label element'
	);
	t.assert(
		basic.find('input[type=checkbox]'),
		'Checkbox has checkbox input'
	);
})