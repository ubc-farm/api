/**
 * Transforms the response depending on queries passed in the request.
 * @param {Promise} data
 * @param {Request} request
 * @param {Object} request.query
 * @param {boolean} [request.query.shallow] - if true, any non-primitive 
 * values in the data are replaced with 'true'.
 * @param {string} [request.query.print] - if equal to 'silent', a 204 response 
 * is sent instead of the data. If equal to 'pretty', the JSON response is 
 * prettified and indented with 2 spaces.
 * @param {Reply} reply
 * @returns {Response}
 */
export function transformReply(data, request, reply) {
	const {print, shallow} = request.query;

	if (shallow) {
		data = data.then(json => {
			if (typeof json === 'object' && json !== null) {
				const keys = Array.isArray(json) ? json.keys() : Object.keys(json);
				for (const key of keys) {
					const value = json[key];
					if (typeof value !== 'string' && typeof value !== 'number' 
					&& typeof value !== 'boolean' && typeof value !== 'symbol'
					&& value !== undefined && value !== null) {
						json[key] = true;
					}
				}
			}

			return json;
		})
	}

	const response = reply(data);

	if (print === 'pretty') response.spaces(2);
	else if (print === 'silent') response.code(204);
	return response;
}

/**
 * Deletes null keys from the object
 * @param {Object|Array} json
 * @returns {Object|Array}
 */
export function removeNullandUndef(json) {
	if (typeof json !== 'object' || json === null) 
		return json;

	let keys, copy;
	if (Array.isArray(json)) {
		keys = json.keys();
		copy = [...json];
	} else {
		keys = Object.keys(json);
		copy = Object.assign({}, json);
	}
	
	for (const key of keys) {
		const value = copy[key];
		if (value === null) delete copy[key];
		else if (typeof value === 'object') copy[key] = removeNullandUndef(value);
	}
	return copy;
}

export {arrayToObjectMap} from '../../ubc-farm-utils/index.js';