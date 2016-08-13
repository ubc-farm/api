import {Server} from 'hapi';
import Inert from 'inert';
import {resolve} from 'path';

import {server as connection} from './package.json';
import css from './routes/css.js';
import {analytics} from './routes/analytics.js';

const server = new Server();
server.connection(connection);
server.path(resolve(__dirname, '../'));

server.register(Inert, err => {if (err) throw err});

server.route(css);
server.route(analytics);

export default server;