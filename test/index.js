const test = require('tap').test;
const nothread = require('../');

test('object headers', assert => {
	const msg = {headers: {foo: 'bar'}, subject: 'some subject'};
	const result = nothread(msg);

	assert.ok(result.subject.match(/^some subject - [a-f0-9]{20}$/));
	assert.ok(result.headers['In-Reply-To'].match(/^<[a-f0-9]{20}>$/));
	assert.end();
});

test('string headers', assert => {
	const msg = {headers: 'foo: bar', subject: 'some subject'};
	const result = nothread(msg);

	assert.ok(result.subject.match(/^some subject - [a-f0-9]{20}$/));
	assert.ok(result.headers.match(/foo: bar\nIn-Reply-To: <[a-f0-9]{20}>/));
	assert.end();
});

test('invalid subject', assert => {
	const msg = {subject: 1};
	assert.throws(() => nothread(msg), new TypeError('Invalid mail object: {"subject":1}'));
	assert.end();
});

test('invalid obj', assert => {
	const msg1 = 'test';
	assert.throws(() => nothread(msg1), new TypeError('Invalid mail object: "test"'));
	const msg2 = undefined;
	assert.throws(() => nothread(msg2), new TypeError('Invalid mail object: undefined'));
	assert.end();
});

test('missing headers', assert => {
	const msg = {subject: 'test'};
	assert.throws(() => nothread(msg), 'Throw on missing headers');
	assert.end();
});
