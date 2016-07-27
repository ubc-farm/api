/** Routes for marko views */
export default [
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