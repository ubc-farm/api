const has = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const REMOVED = Symbol();

/**
 * Returns an object only containing properties that have changed between
 * the two given objects.
 * @param {Object} oldStore
 * @param {Object} newStore
 * @returns {Object[]} an object with only updated keys. Removed keys are
 * given a value of the REMOVED Symbol.
 */
export default function diff(oldStore, newStore) {
	if (oldStore === newStore) return undefined;
	if (typeof newStore !== typeof oldStore) return newStore;
	else if (Array.isArray(newStore)) {
		let clone = [...newStore];
		return oldStore.reduce((difference, oldValue) => {
			const newIndex = clone.indexOf(oldValue);
			if (newIndex === -1) difference.push(REMOVED);
			else {
				const subdiff = diff(oldValue, clone[newIndex]);
				difference.push(subdiff);
				clone.splice(newIndex, 1); 
				console.log(clone);
			}
			return difference;
		}, []).concat(clone);
	} else if (typeof newStore == 'object' && newStore !== null) {
		let oldKeys = Object.keys(oldStore);
		return Object.keys(newStore).reduce((difference, key) => {
			const index = oldKeys.indexOf(key);
			if (index === -1) difference[key] = REMOVED;
			else if (newStore[key] !== oldStore[key]) difference[key] = newStore[key];
			else {
				const subdiff = diff(oldStore[key], newStore[key]);
				if (subdiff !== undefined) difference[key] = subdiff;
			}
			oldKeys.splice(index, 1); return difference;
		}, {}).conat(oldKeys);
	} else return newStore;
}