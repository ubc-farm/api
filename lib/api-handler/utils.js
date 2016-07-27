/**
 * Transform non-primitive values in the object to 'true'. 
 * If passed a primitive, no transformations are done despite the flag. 
 * @param {Object|Array} json
 * @param {boolean} [flag=true] 
 * @returns {Object|Array} 
 */
export function shallowTransform(json, flag = true) {
	if (flag && typeof json === 'object' && json !== null) {
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
}

/**
 * Returns a 204 response
 * @deprecated use transformReply instead
 * @param {Request} request
 * @param {any} [data] - data to return if flag is falsy
 * @param {boolean} [flag=true]
 */
export function silentTransform(request, data, flag = true) {
	if (flag) return request.generateResponse().code(204);
	else return data;
}

/**
 * Adds a pretty print adjustment to the response for JSON strinification
 * @deprecated use transformReply instead
 * @param {Reply} response
 * @param {boolean} [flag=true]
 */
export function prettyPrint(response, flag = true) {
	if (flag) response.spaces(2);
	return response;
}

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
 * @param {Object} json
 * @returns {Object}
 */
export function removeNullandUndef(json) {
	if (typeof json !== 'object' || Array.isArray(json) || json === null) 
		return json;
	
	let copy = Object.assign({}, json);
	for (const key in copy) {
		const value = copy[key];
		if (value === null) delete copy[key];
		else if (typeof value === 'object') copy[key] = removeNullandUndef(value);
	}
	return copy;
}

export {arrayToObjectMap} from '../../lib/utils/array-to-map.js';