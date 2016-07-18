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
	}
];