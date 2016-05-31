import google from 'google/maps';

export const color = {
	primary: 'rgb(59, 166, 72)',
	accent: 'rgb(214, 83, 76)',
	gray: '#999',
	light: '#ddd'
}

export const styles = {
	grid: {
		zIndex: 2,
		fillOpacity: 0.0,
		strokeOpacity: 0.5,
		fillColor: color.gray,
		strokeColor: color.light
	},
	'grid-hover': {
		fillOpacity: 0.4
	},
	'grid-selected': {
		fillOpacity: 0.5,
		strokeOpacity: 0.9,
		fillColor: color.accent,
		strokeColor: color.accent
	},
	field: {
		editable: true,
		fillOpacity: 0.5,
		strokeOpacity: 1,
		fillColor: color.primary,
		strokeColor: color.primary
	},
	edge: {
		strokeOpacity: 0.0,
		strokeColor: color.accent,
		strokeWeight: 6,
		zIndex: 3,
		visible: false
	},
	'edge-hover': {
		strokeOpacity: 1.0
	},
	'edge-active': {
		visible: true
	}
}