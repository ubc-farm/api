import html from './html.js';
import {renderToString} from 'react-dom/server';

export default function(element, head) {
	const body = renderToString(element);
	return html(head, body);
}