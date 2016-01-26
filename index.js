
'use strict';


/**
 * Module dependencies.
 * @private
 */
const util = require('util'),
  TorControl = require('tor-control');


/**
 * @params {String} opts.socksHost (Optional)
 * @params {Number} opts.socksPort (Optional)
 * @params {String} opts.torPass (Optional)
 * @params {Number} opts.switchEvery (Optional) Default = 20
 *
 * @public
 */
function Proxy(opts) {

  this.socksHost = opts.socksHost || '127.0.0.1';
  this.socksPort = opts.socksPort || 9050;
  this.torPass = opts.torPass || false;
  this.switchEvery = opts.switchEvery || 20;

  this.torControl = new TorControl({
    password: opts.torPass || undefined,
    persistent: false
  });

  this.switchProxy = false;
  this.count = 1;
};


Proxy.prototype = {

  /**
   * Every request must be wrapped so library
   * can keep a track on when to switch exit nodes
   *
   * @param {Boolean} forceNewIP (Optional)
   */
  requestWrapper: function(forceNewIP, cb) {

    if (typeof forceNewIP === 'function') {
      cb = forceNewIP;
      forceNewIP = false;
    }

    cb = cb || function() {};


    // Force new proxy agent
    if (forceNewIP) {
      this.switchProxy = true;
    }

    if (this.switchProxy === false &&
        this.count % this.switchEvery !== 0) {

      ++this.count;
      return cb();
    }

    this.torControl.signalNewnym(err => {

      if (err) {
        console.log('Tor signalNewnym Error');
        console.error(err);
      }

      this.torControl.getInfo(['address'],(err, status) => {

        if (err) {
          console.log('Tor getInfo Error');
          console.error(err);
        }

        console.log(`Tor status IP: ${util.inspect(status, { depth: null })}`);

        // Reset count for memory
        this.count = 1;
        this.switchProxy = false;
        return cb();
      });
    });

  }
};


module.exports = opts => {
  return new Proxy(opts);
};
