import search from './search.js';
/** Routes for marko views */
const routes = [
	{
		method: 'GET',
		path: '/test',
		handler: (req, rep) => {
			return search(req, rep, '.js', {
				active: 'Planning',
				title: 'Test Page'
			})
		}
	},
	{
		method: 'GET',
		path: '/planning/database',
		handler: (req, rep) => {
			return search(req, rep, '.js', {
				active: 'Planning',
				title: 'Item Database'
			})
		}
	} 
];
export default routes;