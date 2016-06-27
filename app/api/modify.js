/**
 * Modified the data and reponse before calling reply using
 * query parameters from the request.
 * @param {Promise} promise with data
 * @param {Request} request from hapi handler
 * @param {Reply} reply from hapi handler
 */
export default function modify(promise, request, reply) {
	const {print, shallow} = request.params
	if (print === 'silent') 
		// return a 204 reponse
		promise = promise.then(() => request.generateResponse().code(204));
	else if (shallow) {
		// transform non-primitive keys into 'true'
		promise = promise.then(data => {
			if (typeof data !== 'object') return data;
			for (let key in data) {
				const value = data[key];
				if (typeof value != 'number' 
				&& typeof value != 'string' 
				&& typeof value != 'boolean'
				&& typeof value != 'undefined') {
					data[key] = true;
				}
			}
		})
	}
	let response = reply(promise);
	if (print === 'pretty') response.spaces(2);
	return response;
}