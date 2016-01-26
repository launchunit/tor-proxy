# tor-proxy
A simple wrapper to interact with Tor's controller interface on OSX. So you can proxy application level requests via Tor.

Based on the options, the library will issue __signal newnym__ to make Tor switch to clean circuits, so new application requests don't share any circuits with old ones. Ie. A new exit node.


#### FAQ
1. Where is Tor listening for controller connections? This is specified by either the ControlPort or ControlSocket option in your torrc.

2. To Run Tests, make sure you have __Stem__ installed. Stem is a Python controller library that you can use to interact with Tor. https://stem.torproject.org/api/control.html


----

## Usage

```js
const OPTS = {
 socksHost: 'USER_NAME', // (Optional) Default = 127.0.0.1
 socksPort: 9999, // (Optional) Default = 9050
 torPass: 'blahh',  // (Optional) Default = None
 switchEvery: 50, // (Optional) Default = 20
};

const torProxy = require('./')(OPTS);

/**
 * Every request must be wrapped so library
 * can keep a track on when to switch exit nodes
 *
 * @param {Boolean} forceNewIP (Optional)
 */
torProxy.requestWrapper(function() {
  // Do TCP Stuff
});
```

#### Run Tests

```bash
# To make sure Tor is running
$ python test/tor_running.py
$ npm test
```
