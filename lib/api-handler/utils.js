/**
 * Transform non-primitive keys in the object to 'true'
 * @param {Object} json
 * @param {boolean} [flag=true] 
 * @returns {Object}
 */
export function shallowTransform(json, flag = true) {
	if (flag) {
		for (const key in json) {
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
 * @param {Reply} response
 * @param {boolean} [flag=true]
 */
export function prettyPrint(response, flag = true) {
	if (flag) response.spaces(2);
	return response;
}

/**
 * Deletes null keys from the object
 * @param {Object} json
 * @returns {Object}
 */
export function removeNullandUndef(json) {
	let copy = Object.assign({}, json);
	for (const key in copy) {
		const value = copy[key];
		if (value === null) delete copy[key];
		else if (typeof value === 'object') copy[key] = removeNullandUndef(value);
	}
	return copy;
}

export {arrayToObjectMap} from '../../lib/utils/array-to-map.js';