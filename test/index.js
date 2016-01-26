
const test = require('ava');

// Init Things
const torProxy = require('../')({
  switchEvery: 3
});


test.serial.cb('First Run', t => {
  torProxy.requestWrapper(function() {
    t.end();
  });
});

test.serial.cb('Force Exit Node Switch', t => {
  torProxy.requestWrapper(true, function() {
    t.end();
  });
});

test.serial.cb('Another Request', t => {
  torProxy.requestWrapper(function() {
    t.end();
  });
});

test.serial.cb('Another Request', t => {
  torProxy.requestWrapper(function() {
    t.end();
  });
});

test.serial.cb('Auto Switch on this Request', t => {
  torProxy.requestWrapper(function() {
    t.end();
  });
});
