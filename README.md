# nothread
> (Attempt to) Prevent email threading in mail applications

## Abstract

We test lots of email templates, and threading in email clients makes reviewing changes 
over many iterations annoying.

This module attempts to prevent threading in most email clients, by modifying the subject and `In-Reply-To` header with a unique ID.

nothread supports msgs with both text and object-based headers. Ex:
```js
{
  headers: "foo: bar\n baz: biz"
}
```

```js
{
  headers: {
    foo: 'bar',
    baz: 'biz'
  }
}
```

## Installation
`npm install nothread --save`

## Usage

```js
var nothread = require('nothread');

var myMailMsg = {
  to: "email@foo.biz",
  subject: "bar baz",
  body: "some template"
};

mail.send(nothread(myMailMsg));

```

## Tests

```

> nothread@2.0.0 test
> tap --cov --coverage-report=text test/*.js

TAP version 13
# Subtest: test/index.js
    # Subtest: object headers
        ok 1 - expect truthy value
        ok 2 - expect truthy value
        1..2
    ok 1 - object headers # time=4.64ms
    
    # Subtest: string headers
        ok 1 - expect truthy value
        ok 2 - expect truthy value
        1..2
    ok 2 - string headers # time=1.279ms
    
    # Subtest: invalid subject
        ok 1 - expected to throw: TypeError Invalid mail object: {"subject":1}
        1..1
    ok 3 - invalid subject # time=1.854ms
    
    # Subtest: invalid obj
        ok 1 - expected to throw: TypeError Invalid mail object: "test"
        ok 2 - expected to throw: TypeError Invalid mail object: undefined
        1..2
    ok 4 - invalid obj # time=1.388ms
    
    # Subtest: missing headers
        ok 1 - Throw on missing headers
        1..1
    ok 5 - missing headers # time=0.624ms
    
    1..5
    # time=29.874ms
ok 1 - test/index.js # time=359.581ms

1..1
# time=370.88ms
----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
```
