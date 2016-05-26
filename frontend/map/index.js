/**
 * Script for the fields summary page
 */

import {domReady} from 'utils.js';
import {initMap as start} from 'map/config.js';
import google from 'google-maps';

var panelNode, labelNode, imageNode, desciptionNode, timelineNode; 

function openPanelOnClick() {
	panelNode.classList.add('panel-loading');
	fetch(`/v1/crops/${''}`);
}

domReady.then(start)