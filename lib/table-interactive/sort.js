/**
 * Sorts an array of objects using the provided info, then returns a map
 * where the keys correspond to the old index and the values correspond to the 
 * new index.
 * @param {Object[]} data to sort
 * @param {string} [opts.columnKey] - values at this key are used for sorting.
 * If there is no column specified, a map where the values are identical to the 
 * keys will be returned.
 * @param {boolean} [opts.descending=true] if false, reverse the sorted array
 * @returns {Map} getting a rowIndex returns the new index
 */
export default function sortMap(data = [], {columnKey, descending = true}={}) {
	if (columnKey == null) {
		const simple = new Map();
		for (const index of data.keys()) simple.set(index, index);
		return simple; 
	}

	const type = typeof data[0][columnKey];
	let compareFunc;
	if (type === 'number') compareFunc = (a, b) => a - b; 	
	else compareFunc = (a, b) => a.localeCompare(b);

	const sorted = data
	.map((value, index) => ({value, index}))
	.sort((aObject, bObject) => {
		const a = aObject.value[columnKey], b = bObject.value[columnKey];
		return compareFunc(a, b);
	})
	if (!descending) sorted.reverse();

	const result = new Map();
	for (const [index, {index: oldIndex}] of sorted.entries()) 
		result.set(oldIndex, index);
	return result;
}