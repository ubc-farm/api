import React from 'react';
import {shallow} from 'enzyme';
import test from 'tape';
import FormItem from './component.js';
import Checkbox from '../../app/checkbox';
import Input from '../../app/input/text';

test('Checkboxes for boolean schemas', t => {
	const schema = {type: 'boolean'};
	const wrapper = shallow(<FormItem schema={schema}/>);

	t.equals(wrapper.type(), Checkbox, 
		'Creates checkbox for boolean schemas');
	
	t.equals(wrapper.html(), shallow(<Checkbox/>).html(),
		'Equivalent to a standard checkbox');

	const defaultSchema = {type: 'boolean', default: true};
	const wrap2 = shallow(<FormItem schema={defaultSchema}/>);

	t.equals(wrap2.prop('value'), true,
		'Should set value using default from schema');

	t.end();
})

test('Inputs for number schemas', t => {
	const numField = shallow(<FormItem name='foo' schema={{type: 'number'}}/>);
	const intField = shallow(<FormItem name='foo' schema={{type: 'integer'}}/>);

	t.equals(numField.type(), Input,
		'Creates number input for number schema');
	t.equals(numField.prop('type'), 'number',
		'Input has number type attribute');
	t.equals(intField.html(), numField.html(),
		'Integer schemas are equivalent to number schemas');

	const complexSchema = {
		type: 'number',
		multipleOf: 2,
		maximum: 12,
		minimum: 0,
		default: 6
	};
	const field = shallow(<FormItem name='foo' schema={complexSchema}/>);

	const expectedProps = {
		id: 'foo',
		type: 'number',
		step: 2,
		max: 12,
		min: 0,
		value: 6
	};
	t.comment('passes props to input as number input attributes');
	for (const key in expectedProps) {
		t.looseEquals(field.prop(key), expectedProps[key])
	}

	t.end();
})

test('Inputs for string schemas', t => {
	const basic = shallow(<FormItem name='bar' schema={{type: 'string'}}/>);

	t.equals(basic.type(), Input,
		'Creates text input for string schema');
	
	const complexSchema = {
		type: 'string',
		maxLength: 100,
		minLength: 6,
		default: 'foo@hello.world.com',
		pattern: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
	};
	const complex = shallow(<FormItem name='bar' schema={complexSchema}/>);

	const expectedProps = {
		id: 'bar', type: 'text',
		pattern: '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b',
		maxLength: 100, minLength: 6,
		value: 'foo@hello.world.com'
	}
	t.comment('passes props to input as text input attributes');
	for (const key in expectedProps) {
		t.looseEquals(complex.prop(key), expectedProps[key])
	}

	t.end();
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

	t.equals(phone.type(), FormItem, 'Uses FormItems for children');

	t.equals(phone.prop('schema'), schemaWithProps.properties.phone, 
		'Passes property schema as props for children');
	t.equals(name.prop('required'), true, 
		'Adds required prop to keys listen in required');

	t.end();
})