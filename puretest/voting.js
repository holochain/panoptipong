require('babel-polyfill');
const test = require('tape');


test('An agent is initially not assigned to a team', t => {
  t.equal(getTeam(), 'NotRegistered');
  t.end()
});

test('First agent to register is assigned to team L', t => {
  t.equal(register(), 'L');
  t.end()
});

test('Agent registration can be retrieved', t => {
  t.equal(getTeam(), 'L');
  t.end()
});

test('Can vote in to an open bucket without throwing an error', t => {
  let hash = castVote({
    move: 1,
    teamL: {playerCount: 1, voteCount: 0},
    teamR: {playerCount: 0, voteCount: 0},
    agentHash: 'scatteredsmotheredcovered',
    randomSalt: 'kosherSalt',
    teamID: 'L'
  });
  t.end()
});

test('Bucket was created successfully', t => {
  t.ok(anchorExists('bucket','0'));
  t.end()
});

test('Vote was linked to first bucket', t => {
  t.equal(getLinks(anchor('bucket', '0'), 'vote').length, 1);
  t.end()
});

test('Can vote again in to an open bucket without throwing an error', t => {
  let hash = castVote({
    move: 1,
    teamL: {playerCount: 1, voteCount: 1},
    teamR: {playerCount: 0, voteCount: 0},
    agentHash: 'scatteredsmotheredcovered',
    randomSalt: 'seaSalt',
    teamID: 'L'
  });
  t.end()
});

test('Both votes ended up linked to the same bucket', t => {
  t.equal(getLinks(anchor('bucket', '0'), 'vote').length, 2);
  t.end();
});

test('Almost fill the bucket', t => {
  for(let i = 0; i < BUCKET_SIZE-3; i++) {
    castVote({
      move: 1,
      teamL: {playerCount: 1, voteCount: i+1},
      teamR: {playerCount: 0, voteCount: 0},
      agentHash: 'scatteredsmotheredcovered',
      randomSalt: 'salt'+i,
      teamID: 'L'
    });
  }
  t.end();
});

test('Can fill the bucket', t => {
  let hash = castVote({
    move: 1,
    teamL: {playerCount: 1, voteCount: BUCKET_SIZE-1},
    teamR: {playerCount: 0, voteCount: 0},
    agentHash: 'scatteredsmotheredcovered',
    randomSalt: 'chickenSalt',
    teamID: 'L'
  });

  t.equal(getLinks(anchor('bucket', '0'), 'vote').length, BUCKET_SIZE, 'bucket is full');
  t.equal(getLinks(anchor('bucket', '0'), 'seal').length, 1, 'seal was added');
  t.end()
});

test('Voting post seal created a new bucket', t => {
  let hash = castVote({
    move: 1,
    teamL: {playerCount: 1, voteCount: BUCKET_SIZE},
    teamR: {playerCount: 0, voteCount: 0},
    agentHash: 'scatteredsmotheredcovered',
    randomSalt: 'rockSalt',
    teamID: 'L'
  });
});


