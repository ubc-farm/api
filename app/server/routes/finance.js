import {resolve} from 'path';

export default [
	{
		method: 'GET',
		path: '/finance/sales',
		handler: (request, reply) => reply.view(
			'finance/sales.html',
			{
				breadcrumbs: [
					{title: 'Finances', href: '/finance'},
					{title: 'Sales', href: '/finance/sales'},
					{title: 'Entry', href: '/finance/sales'}
				]
			}
		)
	},
	{
		method: 'GET',
		path: '/directory',
		handler: (request, reply) => reply.view(
			'directory/index.html'
		)
	},
	{
		method: 'GET',
		path: '/directory/index.build.js',
		handler: {
			file: resolve(__dirname, '../../../app/views/directory/index.build.js')
		}
	}
];