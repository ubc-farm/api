import React, {PropTypes} from 'react';
import Checkbox from '../../app/checkbox/index.js';
import Input from '../../app/input/text.js';
import {format} from '../../lib/utils/index.js';

const FormItem = ({name, schema, required}) => {
	if (!schema || !schema.type) return null;

	const {default: defaultValue, title, description} = schema;
	schema = Object.assign({}, schema);
	delete schema.default;

	switch (schema.type) {
		case 'boolean': 
			return (
				<Checkbox {...schema} 
					value={defaultValue}
					required={required}
				>{title || format(name)}</Checkbox>
			)
		case 'integer': 
		case 'number': {
			const {multipleOf, maximum, minimum} = schema;
			return (
				<Input id={name} {...schema}
					type='number'
					step={multipleOf}
					max={maximum}
					min={minimum}
					value={defaultValue ? defaultValue.toString() : undefined}
					required={required}
					helper={description}
				>{title || format(name)}</Input>
			);
		}
		case 'object': {
			const {properties = {}, required = []} = schema;
			return (
				<fieldset name={name}>
					{
						(title || description)
							? <legend>{title} {description}</legend>
							: null
					}
					{
						Object.keys(properties).map(k => (
							<FormItem name={k} key={k}
								schema={properties[k]}
								required={required.includes(k)}
							/>
						))}
				</fieldset>
			);
		}
		case 'string': {
			const {maxLength, minLength, pattern, inputType} = schema;
			return (
				<Input id={name}
					{...schema}
					type={inputType || 'text'}
					pattern={pattern}
					maxLength={maxLength}
					minLength={minLength}
					value={defaultValue}
					required={required}
					helper={description}
				>{title || format(name)}</Input>
			);
		}
		default: return null;
	}
}

FormItem.propTypes = {
	name: PropTypes.string,
	schema: PropTypes.shape({
		type: PropTypes.string
	}),
	required: PropTypes.bool
}

export default FormItem;