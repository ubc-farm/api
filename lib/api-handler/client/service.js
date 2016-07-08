/**
 * @param {string} url - base URL of the api
 * @returns {API}
 * @example
 * // logs data about Person with ID 3
 * api().people[3].then(person => console.log(person))
 * @example
 * // runs DELETE on /api/items/lawnmower
 * delete api().items.lawnmower
 * @example
 * // runs PUT with the given value as the body at api/data/fileX
 * api().data.fileX = {x: xyz}
 */
export default function api(url = '/api', level = 0) {
	if (url.endsWith('/')) url = url.slice(0, -1);
	return new Proxy({}, {
		/** 
		 * Fetches the API url 
		 * @param {...Object} args - objects merged together then passed to fetch
		 * @returns {Promise<Response>}
		 */
		apply(target, thisArg, args) {
			return fetch(url, Object.assign({
				method: 'GET'
			}, ...args));
		},
		/** @returns {API} another API object, one level down */
		get(target, prop, receiver) {
			if (prop === 'then' || prop === 'catch') return Reflect.apply(receiver);

			return api(`${url}/${prop}`, level + 1);
		},
		/** PUTs the value given */
		set(target, prop, value) {
			if (level <= 1) return false;

			fetch(`${url}/${prop}`, {
				body: value,
				method: 'PUT'
			});
			return true;
		},
		/** DELETEs the given property */
		deleteProperty(target, prop) {
			if (level <= 1) return false;

			fetch(`${url}/${prop}`, {
				method: 'DELETE'
			});
			return true;
		}
	})
}