import {Server} from 'hapi';
import Inert from 'inert';
import {resolve} from 'path';

import css from './routes/css.js';
import {analytics} from './routes/analytics.js';

export const port = 3001;

const server = new Server();
server.connection({port});
server.path(resolve(__dirname, '../'));

server.register(Inert, err => {if (err) throw err});

server.route(css);
server.route(analytics);

export default server;