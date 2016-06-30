import test from 'tape';
import {join, posix} from 'path';
import {exists, search} from '../'

test('exists', t => {
	t.plan(2);
	
	exists( join(__dirname, 'folder.spec.js') ).then(doesExist => {
		t.equal(doesExist, true, 
			'Resolve true if a file exists')
	})

	exists( join(__dirname, 'not-a-real-file') ).then(doesExist => {
		t.equal(doesExist, false, 
			'Resolve false if a file does not exist')
	})
})

test('search', t => {
	t.plan(5);
	
	search('folder.spec.js', null, __dirname).then(path => {
		t.equal(path, 'folder.spec.js', 
			'Search should return the given file if it exists');
	})

	search('fake-file.fakeext', null, __dirname).then(
		path => t.fail('Fake file did not throw an error'),
		err => t.pass('Throw an error when a non-existent file is given')
	);

	search('testfolder', '.txt', __dirname).then(path => {
		t.equal(path, 'testfolder/index.txt',
			`Search should find a directory's index file`)
	})

	search('testfolder/something', '.txt', __dirname).then(path => {
		t.equal(path, 'testfolder/something.txt',
			`Search should append the extension to the file`)
	})

	search('/folder.spec.js', null, __dirname).then(path => {
		t.false(path.startsWith('/'), 'Search should return relative paths');
	})
})