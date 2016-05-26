/**
 * Button with some helper functions for generation
 */

export default function iconButton(iconName, label) {
	return buildButton(`/assets/images/icons/${iconName}.svg`, label,{})
}

/**
 * Creates a button element, based on icon-button tag
 * @param {string} [icon] - src of icon image
 * @param {string} [label] - label for the button
 * @param {Object} [options]
 * @param {boolean} [options.asTitle=false] - set the label as the button's title instead (icon only button)
 * @param {string} [options.size=24] - size for the icon 
 * @param {string} [options.addClass] - additional classes for the button
 */
function buildButton(icon, label, {asTitle=false, size='24', addClass=''}) {
	let button = document.createElement('button');
	button.className = 'i-button icon-text hover-light' + addClass;
	
	if (icon) {
		let node = document.createElement('img');
		node.className = 'i-button-icon icon-image'
		node.alt = '';
		node.src = icon;
		node.width = size;
		node.height = size;
		button.appendChild(node);
	}
		
	if (label && !asTitle) {
		let node = document.createElement('span');
		node.className = 'i-button-label';
		node.textContent = label;
		button.appendChild(node);
	} else if (asTitle && label) {
		button.title = label;
	}
	
	return button; 
}