import {createElement as h, PropTypes} from 'react'; /** @jsx h */

/**
 * Table heading for listing the days of the week
 */
const OverviewHeading = ({children = ['S', 'M', 'T', 'W', 'T', 'F', 'S']}) => (
	<thead>
		<tr>
			{children.map((title, i) => <th scope='col' key={i}>{title}</th>)}
		</tr>
	</thead>
);

OverviewHeading.propTypes = {
	children: PropTypes.arrayOf(PropTypes.string)
}

export default OverviewHeading;