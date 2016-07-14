import {LOAD_CSS} from 'LOAD_CSS'

export default function css(files = new Set(), action) {
	switch (action.type) {
		case LOAD_CSS:
			return new Set(files).add(action.payload);

		default: return files;
	}
}