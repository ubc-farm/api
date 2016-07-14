const {rollup} = require('rollup');
const jsdoc2md = require('jsdoc-to-markdown');
const {join} = require('path');
const {Readable} = require('stream');
const {createWriteStream} = require('fs');

class StringStream extends Readable {
	constructor(string) {
		super();
		this._str = string;
	}

	read() {
		if (!this.ended) {
			process.nextTick(() => {
				this.push(new Buffer(this._str));
				this.push(null);
			});
			this.ended = true;
		}
	}
}

function moduleToDocs(module) {
	return rollup({
		entry: join(__dirname, `../lib/${module}/index.js`)
	}).then(({generate}) => generate({
		intro: `/** @module lib/${module} */`
	})).then(({code}) => {
		new StringStream(code)
			.pipe(jsdoc2md({
				'heading-depth': 1
			}))
			.pipe(createWriteStream(
				join(__dirname, `../docs/lib/${module}.md`)
			));
	})
}

[
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
]
.forEach(moduleToDocs);

exports.default = moduleToDocs;