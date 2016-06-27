import modify from './modify.js'

/**
 * Insert an object
 * @param {Request} request
 * @param {Object} request.payload - object to insert
 * @param {Reply} reply
 * @this {Model} model from objection.js
 * @returns {Reply<Object>} 
 */
export function post(request, reply) {
	return reply(
		this.query()
			.insert(request.payload)
			.execute()
	);
}