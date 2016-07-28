import {Server} from 'hapi';
import Inert from 'inert';

const server = new Server();
server.connection({port: 3001});

server.register(Inert, err => {if (err) throw err});

export default server;