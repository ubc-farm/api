/**
 * @param {Object} input
 * @param {string} input.api - string corresponding to apis' properties
 * @param {string} [input.href] - link to use. If ommited, one is generated from the name
 * @param {string|boolean} [input.active] - if true, or if the text is equal to the name (case insensitive), add the class active to this link
 */
exports.render = (input, out) => {
	let {name, href, active = false, class: cname=''} = input;
	
	if (!href) {href = `/${name.toLowerCase()}`}
	if (typeof active === 'string') {
		active = (active.toLowerCase() === name.toLowerCase())
	}
	
	out.write('<a class="nav-link ')
	if (active) {out.write(' active ')}
	out.write(cname);
	out.write('" href="')
	out.write(href) 
	out.write('">')
	out.write(name) 
	out.write('</a>')
}