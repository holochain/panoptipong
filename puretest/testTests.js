
require('babel-polyfill');
const test = require('tape');



  test('First test', t => {

  t.equal(register(),'L')

  vote({move:1});

  vote({move:1});

  vote({move:-1});

  //t.equal(vote({move:1}),)

  debug(countVotes('R'))

  setTimeout(t.equal(countVotes(getTeam()),1),5000)
  //countVotes(getTeam());

  ;

});
