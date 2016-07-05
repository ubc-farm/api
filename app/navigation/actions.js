export const NEW_ACTIVE_CATEGORY = 'NEW_ACTIVE_CATEGORY';
export const NAVIGATE_TO = 'NAVIGATE_TO';

export function changeActiveCategory(newCategory) {
	return { type: NAVIGATE_TO, payload: newCategory }
}

export function navigateTo(href) {
	return dispatch => {
		dispatch(changeActiveCategory(href));
	}
}