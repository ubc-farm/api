import test from 'blue-tape';
import PromiseWorker from '../';

test('Sending messages', t => {
	const worker = new PromiseWorker(__dirname + 'worker-pong.js');
	return worker.postMessage('ping').then(res => {
		t.equal(res, 'pong', 'should recieve a response message')
	})
})

test('Echoing messages', t => {
	const worker = new PromiseWorker(__dirname + 'worker-echo.js');
	return worker.postMessage('ping').then(res => {
		t.equal(res, 'ping', 'should echo the message sent')
	})
})