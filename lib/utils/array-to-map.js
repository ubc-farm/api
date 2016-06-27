/**
 * Transforms an array of objects into a keyed map, using the specified
 * key property as the key used in the Map.
 * @param {Array<Object>} array
 * @param {string} idKey
 * @returns {Map<string, Object>}
 */
export function objectArrayToMap(array, idKey) {
	return array.reduce((map, obj) => map.set(obj[idKey], obj), new Map());
}

/**
 * Transforms an array of objects into a keyed object, using the specified
 * key property as the key used in the new object.
 * @param {Array<Object>} array
 * @param {string} idKey
 * @returns {Object}
 */
export function objectArrayToObject(array, idKey) {
	return array.reduce((newObj, obj) => {
		newObj[ obj[idKey] ] = obj;
		return newObj;
	}, {});
}