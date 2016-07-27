import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import invoiceApp from './reducer.js';

export default createStore(
	invoiceApp,
	applyMiddleware(thunk)
);