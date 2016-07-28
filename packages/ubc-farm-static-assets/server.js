import {Server} from 'hapi';
import Inert from 'inert';

const server = new Server();

server.register(Inert, err => {if (err) throw err});

export default server;