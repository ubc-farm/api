import React, {PropTypes} from 'react';
import Checkbox from '../../app/checkbox';
import Input from '../../app/input/text';

const FormItem = ({name, schema, required}) => {
	if (!schema || !schema.type) return null;

	const {default: defaultValue} = schema;
	schema = Object.assign({}, schema);
	delete schema.default;

	switch (schema.type) {
		case 'boolean': 
			return (
				<Checkbox {...schema} 
					value={defaultValue}
					required={required}
				/>
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
				/>
			);
		}
		case 'object': {
			const {properties = {}, required = [], title, description} = schema;
			return (
				<fieldset {...schema} name={name}>
					{
						(title||description)
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
					maxlength={maxLength}
					minlength={minLength}
					value={defaultValue}
					required={required}
				/>
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