const Handlebars = require('handlebars');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const {resolve} = require('path')

Promise.all([
	fs.readFileAsync(
		resolve(__dirname, '../_partials/app-banner.html'), 
		'utf8'),
	fs.readFileAsync(
		resolve(__dirname, '../_partials/head.html'), 
		'utf8'),
	fs.readFileAsync(
		resolve(__dirname, '../_partials/section-banner.html'), 
		'utf8'),
	fs.readFileAsync('sales.html', 'utf8')
]).then(files => {
	Handlebars.registerPartial('app-banner', files[0]);
	Handlebars.registerPartial('head', files[1]);
	Handlebars.registerPartial('section-banner', files[2]);
	return Handlebars.compile(files[3]);
}).then(template => {
	console.log(template({}))
})