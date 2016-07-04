import enhance from './enhancer.js';

enhance(google.maps.LatLng);

const lat = {
	get: function() {
		return this.lat();
	}
}

const lng = {
	get: function() {
		return this.lng();
	}
}

Object.defineProperties(google.maps.LatLng, {
	lat, lng,
	x: lng, y: lat, long: lng,
	0: lng, 1: lat,
	length: { value: 2 }
})

export default google.maps.LatLng;