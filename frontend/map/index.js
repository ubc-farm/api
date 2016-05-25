/**
 * Script for the fields summary page
 * @requires google.maps
 */

import {docReady} from 'utils.js';

const panelNode, labelNode, imageNode, desciptionNode, timelineNode; 

/**
 * Initializes a map at the specified node
 * @param {string|Element} node - element, or an element's id
 * @returns {google.maps.Map}
 */
function initMap(node) {
	if (typeof node == "string") node = document.getElementById(node);
	return new google.maps.Map(node, {
		center: {lat: 49.249568, lng: -123.237155},
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.SATELLITE
	})
}

function openPanelOnClick() {
	panelNode.classList.add('panel-loading');
	fetch(`/v1/crops/${''}`);
}

docReady.then(() => {initMap(document.getElementById('google-map'))})