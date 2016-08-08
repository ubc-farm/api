import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import gridForm from './grid-reducer.js';
import active from './active-reducer.js';
import fieldData from './field-data-reducer.js';
import mapMeta from './map-meta-reducer.js';

export default createStore(
	combineReducers({
		gridForm,
		active,
		fieldData,
		mapMeta
	}),
	undefined,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)