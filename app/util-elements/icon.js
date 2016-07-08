import React, { PropTypes } from 'react';
import {classlist} from 'lib/utils';

const Icon = ({name, size = 24, className}) => (
	<img className={classlist('icon-image', className)} alt=''
		   width={size} height={size}
			 src={`/assets/images/icons/${name}.svg`} />
)

Icon.propTypes = {
	size: PropTypes.number,
	className: PropTypes.string,
	name: PropTypes.string.isRequired
}

export default Icon;