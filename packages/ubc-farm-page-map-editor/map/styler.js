import {field, grid} from '../../ubc-farm-page-fields/map/style.js';
import {isField, isGridCell} from './filter.js';
import map from './map.js';

map.data.setStyle(feature => {
	if (isGridCell(feature)) {
		let style = Object.assign({}, grid.normal);
		if (feature.getProperty('selected')) Object.assign(style, grid.selected);
		if (feature.getProperty('hover')) Object.assign(style, field.hover);
		return style;
	} else if (isField(feature)) {
		let style = Object.assign({}, field.normal);
		if (feature.getProperty('activeField')) Object.assign(style, field.selected)
		if (feature.getProperty('resizable')) Object.assign(style, field.resizable)
		return style;
	}
});