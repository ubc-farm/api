/**
 * Script for the fields summary page
 */

import {domReady} from 'utils.js';
import google from 'google-maps';

var panelNode, labelNode, imageNode, desciptionNode, timelineNode; 

/**
 * Initializes a map at the specified node
 * @param {string|Element} node - element, or an element's id
 * @returns {google.maps.Map}
 */
function initMap(node) {
	if (typeof node == "string") node = document.getElementById(node);
	return new google.maps.Map(node, {
		center: {lat: 49.249568, lng: -123.237155},
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		fullscreenControl: true,
    scaleControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [
				google.maps.MapTypeId.SATELLITE
			]
		}
	})
}

function openPanelOnClick() {
	panelNode.classList.add('panel-loading');
	fetch(`/v1/crops/${''}`);
}

domReady.then(() => {initMap(document.getElementById('google-map'))})