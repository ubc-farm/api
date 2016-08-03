// utility functions

// first check if moment.js is already loaded in the browser window, if so,
// use this instance. Else, load via commonjs.

import moment from 'moment';
import uuid from './uuid.js';

/**
 * Extend target object with selected properties of source objects.
 * Akin to Object.assign, but filtered.
 * @param {string[]} props
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object} target
 */
export function selectiveExtend(props, target, ...sources) {
	if (!Array.isArray(props)) 
		throw Error('Array with property names expected as first argument');
	
	for (const source of sources) {
		for (const prop of props) {
			if (source.hasOwnProperty(prop)) target[prop] = source[prop];
		}
	}
	return target;
}

/**
 * Deep extend an object with the properties of the source object
 * @param {Object} target
 * @param {Object} source
 * @param {boolean} [protoExtend] - If true, the prototype values will
 * also be extended. (ie. the options object that inherit from others
 * will also ge the inherited options)
 * @param {boolean} [allowDeletion] - if true the values of fields that 
 * are null will not deleted
 */
export function deepExtend(target, source, protoExtend, allowDeletion) {
	for (let prop in source) {
		if (protoExtend || source.hasOwnProperty(prop)) {
			if (source[prop] && source[prop].constructor === Object) {
				if (target[prop] === undefined) target[prop] = {};
				if (target[prop].constructor === Object)
					deepExtend(target[prop], source[prop], protoExtend);
				else {
					if (allowDeletion 
					&& source[prop] === null && target[prop] !== undefined) 
						delete target[prop];
					else	
						target[prop] = source[prop];
				}
			} else if (Array.isArray(source[prop])) {
				target[prop] = [...source[prop]];
			} else {
				if (allowDeletion 
				&& source[prop] === null && target[prop] !== undefined) 
					delete target[prop];
				else	
					target[prop] = source[prop];
			}
		}
	}
	return target;
}

export const extend = Object.assign;