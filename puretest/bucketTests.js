var test = require('tape');
var genesisBucket = {scoreL: 0, scoreR: 0, gameID: 0};

test('getBucketState returns initialState when called with an empty genesis bucket', function (t) {
    var result = getBucketState(genesisBucket);
    t.equal(result, initialState);
    t.end();
  });

test('castVote causes vote to be linked to genesis bucket', function (t) {
    castVote({move: 1,
        teamL: { playerCount: 1, voteCount: 0 },
        teamR: { playerCount: 0, voteCount: 0 },
        agentHash: 'scatteredsmotheredcovered',
        randomSalt: 'kosherSalt',
        teamID: 'L'});    
    t.equal(getLinks(genesisBucket).length, 1);
    t.end();
  });

  test('getCurrentBucket without params returns cached (genesis) bucket', function (t) {
    var result = getCurrentBucket();
    t.equal(result, genesisBucket);
    t.end();
  });

  test('getCurrentBucket with param getCachedBucket returns cached (genesis) bucket', function (t) {
    var result = getCurrentBucket(getCachedBucket());
    t.equal(result, genesisBucket);
    t.end();
  });

  test('getCurrentBucket called on a score-causing bucket returns next bucket', function (t) {
    getBucketState = function (bucket) {
        return {scoreL: 1, scoreR: 0, gameID: 0};
    }
    var result = getCurrentBucket();
    t.equal(result, {scoreL: 1, scoreR: 0, gameID: 0});
    t.end();
  });