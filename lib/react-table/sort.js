/**
 * Sorts the table based on a column key
 * @param {Set<Map<K, any>} column - should correspond to a paticular key
 * @param {K} data for the table
 * @param {function} [compareFunc] - compares the values in the given column
 */
export default function sortTable(
	data, column, 
	compareFunc = (a, b) => a.toString().localeCompare(b)
) {
	const sortedData = Array.from(data).sort((aMap, bMap) => {
		const a = aMap.get(column), b = bMap.get(column);
		return compareFunc(a, b);		
	});
	return new Set(sortedData);
}