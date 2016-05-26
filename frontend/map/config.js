/**
 * Initializes a map at the specified node
 * @param {string|Element} [node='google-map] - element, or an element's id
 * @returns {google.maps.Map}
 */
export function initMap(node = 'google-map') {
	if (typeof node == "string") node = document.getElementById(node);
	console.log(node);
	return new google.maps.Map(node, {
		center: {lat: 49.249568, lng: -123.237155},
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		fullscreenControl: true,
    scaleControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [
				google.maps.MapTypeId.SATELLITE,
				google.maps.MapTypeId.HYBRID
			] 
		}
	})
}

export function hi() {return 'hi'}