
/*----------  Anchor API  ----------*/

function anchor(anchorType, anchorText) {
  return call('anchors', 'anchor', {
    anchorType: anchorType,
    anchorText: anchorText
  }).replace(/"/g, '');
}

function anchorExists(anchorType, anchorText) {
  return call('anchors', 'exists', {
    anchorType: anchorType,
    anchorText: anchorText
  });
}

function getBucketHash(bucket) {
  return anchor('bucket', '' + bucket.index);
}

// function getNumberOfBuckets() {
//   var total = getLinks(anchor('bucket', ''), '').length;
//   get(OPEN_BUCKET_HASH)
//   commit("openBucketIndex", total - 1); // TODO: add as private entry
//   return total;
// }
//
function getCachedOpenBucketEntry() {
  var results = query({
    Return: {
      Hashes: true,
      Entries: true
    },
    Constrain: {
      EntryTypes: ['openBucketIndex']
    }
  });
  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
}

function getOpenBucketIndex() {
  var cacheExists = false;
  var result = getCachedOpenBucketEntry();
  var index = 0;
  if (result) {
    cacheExists = true;
    index = parseInt(result.Entry, 10);
  }
  var startIndex = index;
  while (isBucketFull(index)) {
    index += 1;
  }
  if (startIndex < index || !cacheExists) {
    if (cacheExists) {
      update('openBucketIndex', index + "", result.Hash);
    } else {
      commit('openBucketIndex', index + "");
    }
  }
  return index;
}

function isBucketFull(index) {
  //var hash = getBucketHash({index: data.index});
  //var size = getLinks(hash, 'vote').length;
  debug(size);
  var size = getLinks(anchor('bucket', index + ""), 'vote').length;
  return size >= BUCKET_SIZE;
}

function getSealedBucketState(bucketIndex) {}


// Cast you first Vote and save it localy

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  return true;
}
function validatePutPkg(entry_type) {
  return null;
}
function validateModPkg(entry_type) {
  return null;
}
function validateDelPkg(entry_type) {
  return null;
}
function validateLinkPkg(entry_type) {
  return null;
}

function validateLink(entryType, hash, links, pkg, sources) {
  return true;
}

function validateDelPkg(entryType) {
  return null;
}

var BUCKET_SIZE = 10;

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getVoteList('L').concat(getVoteList('R')).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
    team = 'L';
  } else {
    team = 'R';
  }
  joinTeam(team);
  return team;
}

function getTeam() {
  var response = query({
    Return: {
      Entries: true
    },
    Constrain: {
      EntryTypes: ["teamDesignation"],
      Count: 1
    }
  });

  return response[0] || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

function voteStamp(vote) {
  var totalVotes = vote.teamL.voteCount + vote.teamR.voteCount;
  return String(totalVotes) + makeHash('vote', vote);
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

//VOTE
//vote = {teamID:"",move:"",teamL:{payerCount:"",voteCount:""},teamR:{payerCount:"",voteCount:""},agentHash:"",randomSalt:"",}
//NOTE: if you want to have mutiple games, you would need the GameID too;
function castVote(vote) {
  var bucketIndex = getOpenBucketIndex();
  var anchorHash = anchor("bucket", bucketIndex + "");

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: anchorHash, Link: voteHash, Tag: 'vote' }]
  });
  var sealed = makeSeal(bucketIndex);
  return voteHash;
}

function makeSeal(bucketIndex) {
  var anchorHash = anchor('bucket', bucketIndex + "");
  var bucketVoteCount = getLinks(anchorHash, 'vote').length;
  if (bucketVoteCount >= BUCKET_SIZE) {
    var bucketVotes = getLinks(anchorHash, 'vote', { Load: true });
    var sortedVotes = bucketVotes.map(function (item) {
      return item.Entry;
    }).sort(compareVotes);
    var sealingVote = sortedVotes[BUCKET_SIZE - 1];
    //TODO: replace with calculated state
    //var state = calcState(getSealedBucketState(bucketIndex-1), sortedVotes.slice(0, BUCKET_SIZE));
    var state = calcState(initialState, sortedVotes.slice(0, BUCKET_SIZE), boardParams);
    var voteCount = (bucketIndex + 1) * BUCKET_SIZE;
    var seal = {
      "voteHash": makeHash('vote', sealingVote),
      "voteCount": voteCount,
      "gameState": state
    };
    var sealHash = commit('seal', seal);
    commit('voteLink', {
      Links: [{ Base: anchorHash, Link: sealHash, Tag: 'seal' }]
    });
    return true;
  }
  return false;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
  return voteLinks;
}

function joinTeam(team) {
  commit("teamDesignation", team);
  var teamAnchorHash = anchor('members', team);
  commit("teamLink", {
    Links: [{ Base: teamAnchorHash, Link: App.Key.Hash, Tag: "" }]
  });
}
