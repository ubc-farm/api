import {NEW_ACTIVE_CATEGORY} from './actions.js'

const tableOfContents = {
	'Fields': {

	}, 
	'Planning': {

	}, 
	'Finances': {

	}, 
	'Events': {

	},
	'Logging': {
		
	}
}

export default function navigation(navigationState = {}, action) {
	const {type, payload} = action;
	switch (type) {
		case NEW_ACTIVE_CATEGORY:
			return Object.assign({}, navigationState, {
				currentActivePage: payload,
				subPages: tableOfContents[payload]
			});
		
		default: return navigationState;
	}
}