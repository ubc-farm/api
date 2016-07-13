import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import FormItem from './component.js';
import Checkbox from 'app/checkbox';
import Input from 'app/input';

test('Checkboxes for boolean schemas', t => {
	const schema = {type: 'boolean'};
	const wrapper = shallow(<FormItem schema={schema}/>);

	t.assert(wrapper.equals(<Checkbox/>), 
		'Creates checkbox for boolean schemas');

	const defaultSchema = {type: 'boolean', default: true};
	const wrap2 = shallow(<FormItem schmea={defaultSchema}/>);

	t.assert(wrap2.equals(<Checkbox value={true}/>));

	t.end();
})

test('Inputs for number schemas', t => {
	const numField = shallow(<FormItem schema={{type: 'number'}}/>);
	const intField = shallow(<FormItem schema={{type: 'integer'}}/>);

	t.assert(numField.equals(<Input type='number'/>),
		'Creates number input for number schema');
	t.assert(intField.equals(numField),
		'Integer schemas are equivalent to number schemas');

	const complexSchema = {
		type: 'number',
		multipleOf: 2,
		maximum: 12,
		minimum: 0,
		default: 6
	};
	const field = shallow(<FormItem schema={complexSchema}/>);

	t.assert(field.equals(
		<Input type='number'
			step={2}
			max={12}
			min={0}
			value={6}
		/>
	), 'passes props to input as number input attributes');

	t.end();
})

test('Inputs for string schemas', t => {
	const basic = shallow(<FormItem schema={{type: 'string'}}/>);

	t.assert(basic.equals(<Input/>), 'Creates text input for string schema');
	
	const complexSchema = {
		type: 'string',
		maxLength: 100,
		minLength: 6,
		default: 'foo@hello.world.com',
		pattern: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
	};
	const complex = shallow(<FormItem schema={complexSchema}/>);

	t.assert(complex.equals(
		<Input type='text'
			pattern='\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
			maxlength={100}
			minlength={6}
			value='foo@hello.world.com'
		/>
	), 'Passes props to input as text input attributes')
})

test('fieldsets for object schemas', t => {
	const basic = shallow(<FormItem schema={{type: 'object'}}/>);

	t.equals(basic.name(), 'fieldset', 'Creates a fieldset');

	const titleSchema = {
		type: 'object',
		title: 'Some object',
		description: 'is an object'
	}
	const titles = shallow(<FormItem schema={titleSchema} name='foo'/>);

	t.equals(titles.prop('name'), 'foo', 'passes name prop');

	const legend = titles.childAt(0);
	t.equals(legend.type(), 'legend',
		'Has a legend element as first child');
	t.equals(legend.text(), 'Some object is an object',
		'Uses title and description as legend text');
	
	const schemaWithProps = {
		type: 'object',
		required: ['name'],
		properties: {
			phone: {type: 'number'},
			name: {type: 'string'}
		}
	};
	const wrapper = shallow(<FormItem schema={schemaWithProps}/>);
	const phone = wrapper.childAt(0), name = wrapper.childAt(1);

	t.equals(phone.type(), 'FormItem', 'Uses FormItems for children');

	t.assert(phone.equals(<Input type='number'/>), 
		'Created number input for number property');
	t.assert(name.equals(<Input required/>), 
		'Created required text input for required string property');

	t.end();
})