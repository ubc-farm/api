const iconHelper = require('../../_helpers/icon.js')

const marko = require('marko');
const template = marko.load('./template.marko');

/**
 * @param {Object} input
 * @param {string} [input.icon] - icon shown to the left of the text
 * @param {string} [input.label] - text shown on the button
 * @param {number} [input.size=24] - width and height for the icon
 * @param {string} [input.id] - id for the button
 * @param {string} [input.class] - addtional classes for the button
 */
exports.renderer = (input, out) => {
	const {icon, label, size = '24', id, class: cname} = input;
	
	template.render({
		id: id,
		className: ["i-button icon-text", cname],
		icon: (icon? iconHelper.format(icon) : null),
		label: label,
		size: size
	}, out);
}