/**
 * @param {Object} input
 * @param {string} input.api - string corresponding to apis' properties
 * @param {string} [input.href] - link to use. If ommited, one is generated from the name
 * @param {string|boolean} [input.active] - if true, or if the text is equal to the name (case insensitive), add the class active to this link
 * @param {string} [input.prefix=/] prefix for link generation
 * @param {boolean} [input.color] sets up link for colorized hover
 * @param {string|boolean} [input.hideIf] hides if true or matches name
 */
exports.render = (input, out) => {
	const {name, href, prefix = '/', color} = input;
	let {active = false, hideIf = false} = input;
	
	if (!href) {href = prefix + name.toLowerCase()}
	if (typeof active === 'string') {
		active = active.toLowerCase() === name.toLowerCase()
	}
	if (typeof hideIf === 'string') {
		hideIf = hideIf.toLowerCase() === name.toLowerCase()
	}
	
	if (!hideIf) {
		out.write('<a class="nav-link hover-light ')
		if (active) {out.write('nav-active ')}
		if (color) {
			out.write('nav-color" data-name="')
			out.write(name)
		}
		out.write('" href="')
		out.write(href) 
		out.write('">')
		out.write(name) 
		out.write('</a>')
	} else {
		out.write('');	
	}
}