#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn;

const args = [
  '.', '--out-dir dist/browser',
  '--watch', '--copy-files',
  '--source-maps true',
	'--source-root .'
];

const opt = {
  cwd: __dirname + '../',
  env: (function() {
    process.env.BABEL_ENV = 'node'; 
    return process.env;
  }()),
  stdio: [process.stdin, process.stdout, process.stderr]
};

var app = spawn('./node_modules/.bin/babel', args, opt);