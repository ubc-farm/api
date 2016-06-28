#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn;
const path = require('path');

const args = [
  '.', '--out-dir dist/browser',
  '--watch', '--copy-files',
  '--source-maps true'
];

const opt = {
  cwd: path.resolve(__dirname, '../'),
  env: (function() {
    process.env.BABEL_ENV = 'browser'; 
    return process.env;
  }()),
  stdio: [process.stdin, process.stdout, process.stderr]
};

var app = spawn('./node_modules/.bin/babel', args, opt);