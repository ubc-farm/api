import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import calendarApp from './reducer.js';

export default createStore(
	calendarApp,
	applyMiddleware(thunk)
);