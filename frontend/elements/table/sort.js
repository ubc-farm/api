/**
 * @param {Map[]} table - an array of table data
 * @param {any} key - the key to sort by
 * @param {number} order - 1 for ascending, -1 for descending
 */
export default function sort(table, key, order) {
	return table.sort((aMap, bMap) => {
		let a = aMap.get(key), b = bMap.get(key);
		return a.toString().localeCompare(b);
	})
}