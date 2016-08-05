import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import gridForm from './grid-reducer.js';
import active from './active-reducer.js';
import fieldData from './field-data-reducer.js';

export default createStore(
	combineReducers({
		gridForm,
		active,
		fieldData
	}),
	applyMiddleware(thunk)
)