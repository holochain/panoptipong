var test = require('tape');
var genesisBucket = {scoreL: 0, scoreR: 0, gameID: 0, parentHash: ''};

test('getBucketState returns initialState when called with an empty genesis bucket', function (t) {
    var result = getBucketState(genesisBucket);
    t.deepEqual(result, initialState);
    t.end();
  });



test('castVote causes vote to be linked to genesis bucket', function (t) {
    castVote({move: 1,
        teamL: { playerCount: 1, voteCount: 0 },
        teamR: { playerCount: 0, voteCount: 0 },
        agentHash: 'scatteredsmotheredcovered',
        randomSalt: 'kosherSalt',
        teamID: 'L'});   
    var voteCount = getLinks(makeHash('gameBucket', genesisBucket), 'vote').length; 
    t.equal(voteCount, 1);
    t.end();
  });

test('getCurrentBucket without params returns cached (genesis) bucket', function (t) {
  var result = getCurrentBucket();
  t.deepEqual(result, genesisBucket);
  t.end();
});


test('getCurrentBucket with param getCachedBucket returns cached (genesis) bucket', function (t) {
  var result = getCurrentBucket(getCachedBucket());
  t.deepEqual(result, genesisBucket);
  t.end();
});

// test('getCurrentBucket called on a score-causing bucket returns next bucket', function (t) {
//   getBucketState = function (bucket) {
//       return {scoreL: 1, scoreR: 0, gameID: 0};
//   }
//   var result = getCurrentBucket();
//   t.deepEqual(result, {scoreL: 1, scoreR: 0, gameID: 0});
//   t.end();
// });

test('getCurrentBucket returns next bucket when called after currentBucket has a score', function (t) {
    
  for (let votes = 0; votes < 20; votes++) {
    castVote({move: 0,
      teamL: { playerCount: 1, voteCount: votes },
      teamR: { playerCount: 0, voteCount: 0 },
      agentHash: 'scatteredsmotheredcovered',
      randomSalt: 'kosherSalt'+ votes,
      teamID: 'L'});
  }

  t.comment(JSON.stringify(getCurrentBucket()));
  t.notDeepEqual(getCurrentBucket(), genesisBucket);
  t.end();
});


test('Can set incorrect bucket and then automatically roll back', function (t) {
  var correctBucket = getCurrentBucket();
  // set the cached bucket to the wrong one
  setCachedBucket({scoreL: 3, scoreR: 0, gameID: 0, parentHash: makeHash('gameBucket', correctBucket)});

  var recoveredBucket = getCurrentBucket()

  t.deepEqual(correctBucket, recoveredBucket);

});
  