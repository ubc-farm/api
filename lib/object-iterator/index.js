export function* keys(object) {
	for (const key in object) yield key;
}

export function* values(object) {
	for (const key in object) yield object[key];
}

export function* entries(object) {
	for (const key in object) yield [key, object[key]];
}