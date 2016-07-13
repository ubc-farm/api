import React, {PropTypes} from 'react';
import Checkbox from 'app/checbox';
import Input from 'app/input';

const FormItem = ({name, schema, required}) => {
	switch (schema.type) {
		case 'boolean': 
			return (
				<Checkbox {...schema} 
					value={schema.default} 
					required={required}
				/>
			)
		case 'integer': 
		case 'number': {
			const {multipleOf, maximum, minimum} = schema;
			return (
				<Input {...schema}
					type='number'
					step={multipleOf}
					max={maximum}
					min={minimum}
					value={schema.default}
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
				<Input
					{...schema}
					type={inputType || 'text'}
					pattern={pattern}
					maxlength={maxLength}
					minlength={minLength}
					value={schema.default}
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