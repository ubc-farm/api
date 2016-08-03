/**
 * Find a custom time from an event target:
 * searches for the attribute 'custom-time' in the event target's element tree
 * @param {Event} event
 * @return {CustomTime | null} customTime
 */
export function customTimeFromTarget({target}) {
	while (target) {
		if (target.hasOwnProperty('custom-time')) return target['custom-time'];
		target = target.parentNode;
	}
	return null;
}