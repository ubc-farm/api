import test from 'tape';
import PromiseWorker from '../';

test('Sending messages', {
	skip: typeof Worker === 'undefined'
}, t => {
	const worker = new PromiseWorker(__dirname + 'worker-echo.js');
	t.plan(2);
	worker.postMessage('pong')
		.then(res => t.assert(res, 'should recieve a response message'))
	worker.postMessage('ping')
		.then(res => t.equal(res, 'ping', 'should echo the message sent'))
})