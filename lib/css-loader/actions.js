export const LOAD_CSS = 'LOAD_CSS';

export function loadCSS(file) {
	return { type: LOAD_CSS, payload: file }
}