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

export const fields = {
	method: 'GET',
	path: '/fields',
	handler: {
		view: {
			template: 'ubc-farm-page-fields/view.html'
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

export const mapEditor = {
	method: 'GET',
	path: '/fields/editor',
	handler: {
		view: {
			template: 'ubc-farm-page-map-editor/view.html',
			context: {
				breadcrumbs: [
					{title: 'Fields', href: '/fields'},
					{title: 'Editor', href: '#'}
				]
			}
		}
	}
}