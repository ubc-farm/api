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

export const calendar = {
	method: 'GET',
	path: '/calendar',
	handler: {
		view: {
			template: 'ubc-farm-page-calendar/view.html'
		}
	}
}

export const planner = {
	method: 'GET',
	path: '/calendar/planner',
	handler: {
		view: {
			template: 'ubc-farm-page-planner/view.html',
			context: {
				breadcrumbs: [
					{title: 'Finance', href: '/finance'},
					{title: 'Sales', href: '#'}
				]
			}
		}
	}
}