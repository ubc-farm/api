/**
 * Script for the main event page
 */

import {domReady} from 'utils.js';
import EventMainPage from './main.js';
import EventCard from 'elements/info/event.js';

import React from 'react';
import ReactDOM from 'react-dom';

domReady.then(() => {
	return ReactDOM.render(
		<EventMainPage>
			<EventCard/>
		</EventMainPage>
	, document.getElementById('main-event'))
})