import {search} from 'lib/folder';

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/planning/database',
		handler: {
			template: {
				type: 'react',
				path: 'app/database-list/view.js'
			}
		}
	} 
];
export default routes;