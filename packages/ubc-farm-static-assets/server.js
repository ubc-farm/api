import {Server} from 'hapi';

const server = new Server();

import Inert from 'inert';
server.register(Inert, err => {if (err) throw err});

import css from './routes/css.js';
server.routes(css);

export default server;