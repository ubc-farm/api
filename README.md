# ubc-farm
Program for the [Centre for Sustainable Food Systems at UBC Farm](http://ubcfarm.ubc.ca/)

## Application Structure ##

### Lib and App
The [lib](lib) and [app](app) folders contain JavaScript for the program to run. The folder structure is similar to node_modules in that each folder is its own module for the program. Babel compiles the files into either CommonJS format
for Node.JS, or to SystemJS format to run in the browser.

#### Server
[Hapi](http://hapijs.com/) is used as the server framework, and its routes live in the [app/server](app/server) folder. Migration and seed files for [Knex](knexjs.org) currently also live in this folder.

### Assets
The [assets](assets) directory contains static files like images, fonts, robots.txt, etc. Built files are put into the static folder and should have content hash signs for better cache control, and am asset manifest file links the content hashes to the original file names. static is ignored by git.

### Docs
The docs directory is ignored by git as it contains a seperate repository, linked to the GitHub wiki.

### Styles
Styles are processed through [postcss-import](https://github.com/postcss/postcss-import) and [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables). This allows for the CSS to be broken into multiple files and allow for variables to be declared, following the standard CSS format. The functionality is intentionally kept simple. Compiled files have content hash suffixes and a [manifest.json](static/manifest.json) links to their names without the content hash.

### Views
Both [Marko](http://markojs.com/) and [React](https://facebook.github.io/react/index.html) are currently used as view engines for the program. The files are then served through routes on the Hapi server, with [Vision](https://github.com/hapijs/vision) acting as a view system for [Hapi](https://github.com/hapijs/hapi). JSX files in helper folders (prefixed with `_`) are copied to the frontend build so they can remount as React components.

### Test
[Tape](https://github.com/substack/tape) is used for testing. Tests can be run with the command `npm test`.

## Environment Variables ##
Configuration is stored in different enviornment variables.

## Api Endpoints
* `GOOGLE_TOKEN`, the key for Google APIs

## Configuration
* `NODE_PORT`, the port the koa server runs on
* `PG_CONNECTION`, connection string for PostgreSQl
* `WWW_STATIC`, the directory to output static files
* `REV_MANIFEST`, the full path to assest manifest json