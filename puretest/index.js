
require('babel-polyfill');
const test = require('tape');

test('simple test', function (t) {
  const hash = makeHash('vote', '');
  t.equal(1,1);
  new Promise(function(fulfill, reject) {
    t.equal(2,2);
    setTimeout(fulfill, 2000)
  }).then(function(v) {
    t.equal(3,3);
    t.end()
  })
});
