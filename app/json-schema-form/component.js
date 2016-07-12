import React, {PropTypes} from 'react';
import Checkbox from 'app/checbox';
import Input from 'app/input';

const FormItem = ({key, schema}) => {
	switch (schema.type) {
		case 'boolean': 
			return <Checkbox {...schema}/>
		case 'integer': 
		case 'number': {
			const {multipleOf = 'any', maximum, minimum} = schema;
			return (
				<Input type='number'
					step={multipleOf}
					max={maximum}
					min={minimum}
				/>
			);
		}
		case 'object': {
			const {properties, required = []} = schema;
			return (
				<fieldset {...schema} name={key}>
					{
						Object.keys(properties).map(key => (
							<FormItem key={key} 
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
				/>
			);
		}
	}
}

FormItem.propTypes = {
	key: PropTypes.string,
	schema: PropTypes.shape({
		type: PropTypes.string
	})
}

export default FormItem;