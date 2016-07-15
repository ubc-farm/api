/**
 * A set where the values can be looked up by ID
 */
export default new Proxy(Set, {
	get(target, prop, receiver) {
		if (typeof prop === 'number') {
			if (prop >= target.size) return undefined;
			else return getIndexInSet(target, prop);
		} else return Reflect.get(target, prop, receiver);
	},
	set(target, prop, value, receiver) {
		if (typeof prop === 'number') {
			if (prop >= target.size) {
				return target.add(value);
			} else return setIndexInSet(target, prop, value);
		} else return Reflect.set(target, prop, value, receiver);
	},
	ownKeys(target) {
		let keys = [];
		for (let i = 0; i < target.size; i++) keys.push(i);
		return keys;
	},
	deleteProperty(target, property) {
		if (typeof property === 'number') {
			if (property >= target.size) return false;
			else {
				const value = getIndexInSet(target, property);
				return target.delete(value);
			}
		} else return Reflect.deleteProperty(target, property);
	}
})

function getIndexInSet(set, index) {
	let i = 0;
	for (let value of set) {
		if (i === index) return value;
		i++;
	}
}

function setIndexInSet(set, index, value) {
	let i = 0, clone = new Set(set);
	set.clear();
	for (let val of clone) {
		if (i === index) set.add(value);
		else set.add(val);
		i++;
	}
}