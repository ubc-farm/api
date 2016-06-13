/**
 * @file preset styles for map objects
 * @module map/shapes/style.js
 */

export const color = {
	primary: 'rgb(59, 166, 72)',
	accent: 'rgb(214, 83, 76)',
	gray: '#999',
	light: '#ddd'
}

export const grid = {
	normal: {
		zIndex: 2,
		fillOpacity: 0.0,
		strokeOpacity: 0.5,
		fillColor: color.gray,
		strokeColor: color.light
	},
	hover: {
		fillOpacity: 0.4
	},
	selected: {
		zIndex: 3,
		fillOpacity: 0.5,
		strokeOpacity: 0.9,
		fillColor: color.accent,
		strokeColor: color.accent
	}
}

export const field = {
	normal: {
		fillOpacity: 0.5,
		strokeOpacity: 1,
		fillColor: color.primary,
		strokeColor: color.primary,
		zIndex: 1
	}
}