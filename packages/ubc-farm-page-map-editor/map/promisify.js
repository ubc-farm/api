/** Promisified version of Data.Feature.toGeoJson() */
export function toGeoJson(feature) {
	return new Promise(resolve => feature.toGeoJson(resolve));
}