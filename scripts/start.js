#!/usr/bin/env node

'use strict';

const spawn = require('child_process').spawn;

const args = [
  'dist/app/server/index.js'
];

const opt = {
  cwd: __dirname,
  env: (function() {
    process.env.NODE_PATH = '.'; // Enables require() calls relative to the cwd
    return process.env;
  }()),
  stdio: [process.stdin, process.stdout, process.stderr]
};

var app = spawn(process.execPath, args, opt);