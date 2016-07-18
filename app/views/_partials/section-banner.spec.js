const Handlebars = require('handlebars');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const template = fs.readFileAsync('section-banner.html', 'utf8')
	.then(html => Handlebars.compile(html));

template.then(template => {
	console.log(template({}));

	console.log(template({
		title: 'Fields', href: './fields'
	}));

	console.log(template({
		breadcrumbs: [
			{title: 'Finances', href: './finance'},
			{title: 'Sales', href: './finance/sales'},
		]
	}));
})