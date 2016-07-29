/**
 * Serves a template using Vision
 * @param {Object|string} options
 * @param {string} options.template
 * @param {Object} options.context
 */
export default function(route, options = {}) {
	if (typeof options === 'string') options = {template: options};
	const {template, context} = options;
	
	return function(request, reply) {
		return reply.view(template, context, options);
	}
}