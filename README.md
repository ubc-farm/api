# ubc-farm
Program for the [Centre for Sustainable Food Systems at UBC Farm](http://ubcfarm.ubc.ca/)

## Application Structure ##

### Backend
[backend](backend) scripts for node.js are contained here, including the server code. [koa v2](https://github.com/koajs/koa/tree/v2.x) is used as the server framework, but with Promises instead of the async function sugar. Keep server JavaScript files within this folder. All files are run in strict mode and transformed with babel, which allows ES6 import syntax in the node.js files. Some files, in the shared folder, are complied to the browser as well.

### Frontend
[frontend](frontend) contains JavaScript run in the browser, and is consequently designed to run in different potential enviornments. [src](frontend/src) contains code to be included through `<script>` tags while [workers](frontend/workers) contains Web, Shared, and Service Worker scripts. [vendor](frontend/vendor) has vendor scripts like Google Analytics and polyfills. These files are compiled into the build subfolder with content hashes and a manifest. 

### Assets
The [assets](assets) directory contains static files like images, fonts, robots.txt, etc. Built files are put into the static folder and should have content hash signs for better cache control, and am asset manifest file links the content hashes to the original file names. static is ignored by git.

### Docs
The docs directory is ignored by git as it contains a seperate repository, linked to the GitHub wiki.

### Styles
Styles are processed through [postcss-import](https://github.com/postcss/postcss-import) and [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables). This allows for the CSS to be broken into multiple files and allow for variables to be declared, following the standard CSS format. The functionality is intentionally kept simple. Compiled files have content hash suffixes and a [manifest.json](static/manifest.json) links to their names without the content hash.

### Views
Both [Marko](http://markojs.com/) and [React](https://facebook.github.io/react/index.html) are currently used as view engines for the program. The files are then served through routes on the Hapi server, with [Vision](https://github.com/hapijs/vision) acting as a view system for [Hapi](https://github.com/hapijs/hapi). JSX files in helper folders (prefixed with `_`) are copied to the frontend build so they can remount as React components.

### Test
[Mocha](mochajs.org) is the testing utility and [Chai](http://chaijs.com/) is used for assertions. 

## Environment Variables ##
Configuration is stored in different enviornment variables.

## Api Endpoints
* `GOOGLE_TOKEN`, the key for Google APIs
* `FIREBASE_CREDENTIALS`, the path to the Firebase credential .json file

## Configuration
* `NODE_PORT`, the port the koa server runs on
* `PG_CONNECTION`, connection string for PostgreSQl
* `FIREBASE_DATABASE`, connection url for Firebase Database
* `WWW_STATIC`, the directory to output static files
* `REV_MANIFEST`, the full path to assest manifest json