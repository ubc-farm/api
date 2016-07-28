import {Server} from 'hapi';

export const port = 3001;

const server = new Server();
server.connection({port});

import Inert from 'inert';
server.register(Inert, err => {if (err) throw err});

import css from './routes/css.js';
server.routes(css);

export default server;