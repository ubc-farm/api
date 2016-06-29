import {search} from 'lib/folder';
import {join} from 'path';

const handler = {
	template: {
		type: 'marko',
		relativeTo: join(process.env.WORKSPACE_ROOT, 'views')
	}
}

/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/fields/edit/{clientParams*}',
		handler
	},
	{
		method: 'GET',
		path: '/fields/{fieldID?}',
		handler
	},
	{
		method: 'GET',
		path: '/events/{task?}',
		handler
	},
	{
		method: 'GET',
		path: '/finances/{page*}',
		handler
	},
];
export default routes;