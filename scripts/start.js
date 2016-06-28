#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn;
const path = require('path');

const args = [
  'dist/node/app/server/index.js'
];

const opt = {
  cwd: path.resolve(__dirname, '../'),
  env: (function() {
    process.env.NODE_PATH = './dist/node'; // Enables require() calls relative to the cwd
    return process.env;
  }()),
  stdio: [process.stdin, process.stdout, process.stderr]
};

var app = spawn(process.execPath, args, opt);