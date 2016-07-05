import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import map from 'app/googlemap-connector/reducer';
import navigation from 'app/navigation/reducer';
//import subreducer from '';

export const rootReducer = combineReducers({
	map,
	navigation
})

let store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default store;