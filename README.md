# ubc-farm
Program for the [Centre for Sustainable Food Systems at UBC Farm](http://ubcfarm.ubc.ca/)

## Application Structure ##

The code is split into various [subpackages](packages) with specific roles.

### Servers
There are 3 child servers and one [reverse proxy](packages/ubc-farm-server-proxy) master server for the program. The indivdual servers run the [API](packages/ubc-farm-api), serve [static assets](packages/ubc-farm-static-assets), and [compile page packages](packages/ubc-farm-package-server) for the browser. Hapi is used for all the servers.

### Docs
The docs directory is ignored by git as it contains a seperate repository, linked to the GitHub wiki.

### Test
[Tape](https://github.com/substack/tape) is used for testing. Tests can be run with the command `npm test`.