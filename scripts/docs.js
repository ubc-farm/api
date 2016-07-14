const {rollup} = require('rollup');
const jsdoc2md = require('jsdoc-to-markdown');
const {resolve: join} = require('path');
const {Readable} = require('stream');
const {createWriteStream} = require('fs');
const Promise = require('bluebird');
const babel = require('rollup-plugin-babel');

function moduleToDocs(mod) {
	console.log(mod);
	return rollup({

		entry: join(__dirname, `../${mod}/index.js`),
		plugins: [babel({plugins: ['transform-react-jsx']})]

	}).then(({generate}) => generate({

		intro: `/** @module ${mod} */`

	})).then(({code}) => new Promise((resolve, reject) => {
		const s = new Readable(); s.push(code); s.push(null);
		const j = s.pipe(jsdoc2md( {'heading-depth': 1} ))

		const path = join(__dirname, `../docs/${mod}.md`)
		//console.log(__dirname, `../docs/${mod}.md`, path, join);
		const w = j.pipe(createWriteStream(path));
		//const w = j.pipe(process.stdout);

		w.on('finish', resolve);
		w.on('error', reject);
	}))
}

const list = [
	'api-handler',
	'autogrid',
	'calendar',
	'folder',
	'geojson',
	'angle',
	'module-worker',
	'money',
	'network',
	'postgres-types',
	'react-table',
	'utils'
].map(n => `lib/${n}`);

list.push('app/models');

const docs = Promise.mapSeries(list, path => moduleToDocs(path))

module.exports = {
	default: moduleToDocs,
	list,
	docs
}

//docs.then(() => process.exit(0));