const test = [
	{
		name: 'Group1',
		type: 'checkbox',
		inputs: [],
	}
]

/**
 * Creates a checkbox or radio followed by a label
 */
export function buildInput(type, label, check, groupName) {
	const id = `filter-${groupName || type}-${label}`;
	let fragment = new DocumentFragment();
	
	let input = document.createElement('input');
	input.id = id;
	input.className = `filter-input filter-${type}`;
	//input.setAttribute('aria-labelledby', id + '-label');
	input.type = type;
	if (check != null) input.checked = check; 
	fragment.appendChild(input);
	
	let labelNode = document.createElement('label');
	labelNode.setAttribute('for', id);
	labelNode.textContent = label;
	//labelNode.id = id + '-label';
	labelNode.className = 'filter-label';	
	fragment.appendChild(labelNode);
	
	return fragment;
}

export default class Filter {
	/**
	 * @param {Object[]} groups - array of objects describing input groups
	 * @param {string} [groups[].name=''] - name of the group, used with update events
	 * @param {string} [groups[].type=checkbox] - type of input, either checkbox or radio
	 * @param {string[]} groups[].inputs - labels for the inputs 
	 */
	constructor(...groups) {
		for (group in groups) {
			this.groupNames.push(group.name);
		}
	}
}