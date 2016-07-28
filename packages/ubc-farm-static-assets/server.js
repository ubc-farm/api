import {Server} from 'hapi';
import Inert from 'inert';

import css from './routes/css.js';

export const port = 3001;

const server = new Server();
server.connection({port});

server.register(Inert, err => {if (err) throw err});

server.routes(css);

export default server;