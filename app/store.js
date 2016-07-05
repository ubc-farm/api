import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import map from 'app/googlemap-connector/reducer';
//import subreducer from '';

export const rootReducer = combineReducers({
	map
})

let store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default store;