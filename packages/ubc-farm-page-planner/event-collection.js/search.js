/**
 * Finds a value in an array using the given sorting function through
 * a binary search algorithm.
 * @param {function} sortFunc - same type of function used by Array.sort
 * @param {Array} searchArray - array to search
 * @param {boolean} [fail] - if the exact target is not found, 
 * the cloest index is returned. If fail is true, undefined will be 
 * returned instead.
 */
export default function findClosestIndex(sortFunc, searchArray, fail) {
	let L = 0, R = searchArray.length - 1;
	let index;
	while (L <= R) {
		index = Math.floor((L + R) / 2);
		const comparison = sortFunc(searchArray[index]);

		if (comparison < 0) L = index + 1;
		else if (comparison > 0) R = index - 1;
		else return index;
	}
	if (fail) return undefined; else return index;
}

export function findTarget(searchArray, target) {
	return find(searchArray, b => b - target);
}