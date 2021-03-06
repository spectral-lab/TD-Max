// @ts-nocheck

/***
 * For `js` Object in Max
 */

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

var console = {
  log: function() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      var message = arguments[i];
      if (message && message.toString) {
        var s = message.toString();
        if (s.indexOf('[object ') >= 0) {
          s = JSON.stringify(message);
        }
        post(s);
      } else if (message === null) {
        post('<null>');
      } else {
        post(message);
      }
    }
    post('\n');
  },
  error: function() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      var message = arguments[i];
      if (message && message.toString) {
        var s = message.toString();
        if (s.indexOf('[object ') >= 0) {
          s = JSON.stringify(message);
        }
        error(s);
      } else if (message === null) {
        error('<null>');
      } else {
        error(message);
      }
    }
    error('\n');
  }
};

function print(input) {
  if (input.startsWith('stderr')) {
    console.error(input.replace('stderr ', ''))
    return;
  }
  const msg = input.replace('stdout ', '');
  if (msg.startsWith('Starting')) {
    console.log(
      '///////////////////////////////////////////////////////////////'
    );
    console.log('TDD-MAX');
    console.log(
      '///////////////////////////////////////////////////////////////'
    );
    return;
  }
  if (msg.startsWith('Running')) {
    console.log('===========================');
    console.log(msg);
    return;
  }
  if (msg.startsWith('Passed')) {
    console.log('  # ' + msg);
    return;
  }
  if (msg.startsWith('Init')) {
    console.log('  - ' + msg);
    return;
  }
  if (msg.startsWith('Finished')) {
    console.log(
      '///////////////////////////////////////////////////////////////'
    );
    console.log(msg);
    console.log(
      '///////////////////////////////////////////////////////////////'
    );
    return;
  }
  console.log(msg);
}
