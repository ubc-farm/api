/* global google */
import polygonRef, {handlePolygonClick, polygonData} from './polygons.js';
import {field} from './style.js';

export default function getPolygonsFromAPI() {
	return fetch('/api/fields/geojson').then(collection => {
		for (const {id, geometry} of collection.features) {
			if (geometry.type !== 'Polygon') continue;

			const polygon = new google.maps.Polygon(field.normal);
			polygon.paths = geometry.coordinates.map(line => line.map(
				([lng, lat]) => {lat, lng}
			));
			
			polygonData.set(polygon, {
				id,
				clickListener: google.maps.event.addListener(
					polygon, 'click', handlePolygonClick
				)
			});

			polygonRef.set(id, polygon);
		}
	})
}