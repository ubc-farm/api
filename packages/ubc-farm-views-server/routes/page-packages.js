export const directory = {
	method: 'GET',
	path: '/directory',
	handler: {
		view: {
			template: 'ubc-farm-page-directory/view.html'
		}
	}
}

export const invoice = {
	method: 'GET',
	path: '/finance/sales',
	handler: {
		view: {
			template: 'ubc-farm-page-invoice/view.html',
			context: {
				breadcrumbs: [
					{title: 'Finance', href: '/finance'},
					{title: 'Sales', href: '#'}
				]
			}
		}
	}
}