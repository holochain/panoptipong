
require('babel-polyfill');
const test = require('tape');

test('simple test', t => {
  const hash = makeHash('vote', {
      "move" : -1,
      "teamL": 0,
      "teamR": 0,
      "agentHash": "iausdhfouishdf",
      "randomSalt": "089hw",
      "teamID": "L"
  });

  const hash1 = commit('vote', {
      "move" : -1,
      "teamL": 0,
      "teamR": 0,
      "agentHash": "iausdhfouishdf",
      "randomSalt": "089hw",
      "teamID": "L"
  })

  t.equal(hash, hash1);

  new Promise(function(fulfill, reject) {
    t.equal(2,2);
    setTimeout(fulfill, 2000)
  }).then(function(v) {
    t.equal(3,3);
    t.end()
  })
});
