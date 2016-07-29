import {Server} from 'hapi';
import Inert from 'inert';
import {resolve} from 'path';

import {server_uri as uri} from './package.json';
import css from './routes/css.js';
import {analytics} from './routes/analytics.js';

const server = new Server();
server.connection({uri});
server.path(resolve(__dirname, '../'));

server.register(Inert, err => {if (err) throw err});

server.route(css);
server.route(analytics);

export default server;