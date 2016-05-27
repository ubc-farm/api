/**
 * Script for the fields editor page
 */

import {domReady} from 'utils.js';
import {initMap as start} from 'map/config.js';
import iconButton from 'elements/icon-button.js'
import google from 'google-maps-drawing';

import FieldEditor from 'map/field-edit.js';

var editor = new FieldEditor();

domReady.then(() => {
	let sidebar = document.getElementById('map-edit-aside');
	
	let frag = document.createDocumentFragment();
	let add = iconButton('add', 'Add Field');
	let select = iconButton('edit', 'Select');
	
	frag.appendChild(add); editor.addButton = add;
	frag.appendChild(select); editor.selectButton = select;
	sidebar.insertBefore(frag, sidebar.firstChild);
	
	return start();
}).then(map => { 
	map.setTilt(0);
	editor.map = map 
});