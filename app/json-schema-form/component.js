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
			const {multipleOf = 'any', maximum, minimum} = schema;
			return (
				<Input type='number'
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
						Object.keys(properties).map(key => (
							<FormItem name={key} key={key}
								schema={properties[key]}
								required={required.includes(key)}
							/>
						))}
				</fieldset>
			);
		}
		case 'string': {
			const {maxLength, minLength, pattern} = schema;
			return (
				<Input
					{...schema}
					pattern={pattern}
					maxlength={maxLength}
					minLength={minLength}
					value={schema.default}
					required={required}
				/>
			);
		}
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