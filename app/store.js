import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {routerReducer as routing} from 'react-router-redux';
import map from 'app/googlemap-connector/reducer';
import navigation from 'app/navigation/reducer';
import tables from 'lib/react-table/reducer';

export const rootReducer = combineReducers({
	map,
	navigation,
	tables,
	routing,
	agenda: {},
	today: new Date(Date.now())
})

let store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export default store;