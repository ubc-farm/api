import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {routerReducer as routing} from 'react-router-redux';
import map from 'app/googlemap-connector/reducer';
import navigation from 'app/navigation/reducer';

export const rootReducer = combineReducers({
	map,
	navigation,
	routing
})

let store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default store;