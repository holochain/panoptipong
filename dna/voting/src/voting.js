

/*=============================================
=            Public Zome Functions            =
=============================================*/



function getState() {
  var currentBucket = getCurrentBucket();
  debug("getting state from bucket "+JSON.stringify(currentBucket));
  return getBucketState(getCurrentBucket());
}

function getVotesAfterVote(payload) {

  var sortedVotes = getLinks(makeHash('gameBucket', getCurrentBucket()), 'vote', {Load: true})
    .map(function (item) { return item.Entry })
    .sort(compareVotes);

  if (payload && payload.vote) {
    return sortedVotes.filter(function(element) {
      return compareVotes(payload.vote, element) > 0
    });
  } else {
    var n = 10;
    var startIndex = Math.min(sortedVotes.length - n, 0);
    return sortedVotes.slice(startIndex, sortedVotes.length);
  }

}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1
  } else {
    return totalVotesA - totalVotesB;
  }
}

function getPlayers() {
  return getLinks(anchor('players', 'players'), '', {Load: true}).map(function (item) {
    return item.Entry;
  });
}

// REGISTERED YOUR AGENT
function register(payload) {


  var name;
  if(payload) {
    name = payload.name;
  } else {
    name = "";
  };

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function(elem) {
    return elem.Hash ===  App.Key.Hash;
  });
  var inR = membersR.some(function(elem) {
    return elem.Hash ===  App.Key.Hash;
  });

  if(inL) { return 'L' }
  if(inR) { return 'R' }

  var team;
  if(membersL.length <= membersR.length) {
    team = 'L';
  } else {
    team = 'R';
  }
  joinTeam(team, name);
  return team;
}


function getTeam() {
  var response = query({
    Return: {
      Entries: true
    },
    Constrain: {
      EntryTypes: ["privatePlayerRegistration"],
      Count: 1
    }
  });

  var rego = response[0] || {teamID : "NotRegistered"}
  return rego.teamID;
}


function getRegistration() {
  var response = query({
    Return: {
      Entries: true
    },
    Constrain: {
      EntryTypes: ["privatePlayerRegistration"],
      Count: 1
    }
  });

  return response[0] || "NotRegistered"
}


function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: {playerCount: nPlayersL, voteCount: nVotesL},
    teamR: {playerCount: nPlayersR, voteCount: nVotesR},
    agentHash: App.Key.Hash,
    randomSalt: ""+Math.random(),
    teamID: getTeam()
  };

  debug(vote);

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize:3,
  vBall: 10,
  vPaddle: 1.3,
};


// var initialState = {
//   ball: {
//       x: 100,
//       y: 50
//   },
//   vBall: {
//     x: 5,
//     y: 5,
//   },
//   paddleL: 50,
//   paddleR: 50,
//   scoreL: 0,
//   scoreR: 0,
//   ballMovingLeft: false,
// };


var angleMin = 30;
var angleMax = 60;

function ballVectorFromHash(hash) {
  // randomly select an angle in quadrant 0 and covnert to components
  var theta = hashToInt(hash, angleMin, angleMax);
  debug(theta);
  var vBallx = boardParams.vBall*Math.cos( theta * Math.PI / 180);
  var vBally = boardParams.vBall*Math.sin( theta * Math.PI / 180);

  var yDir = hashToInt(hash, 0, 2)*2 - 1;
  var xDir = hashToInt(hash+hash, 0, 2)*2 - 1;

  return {
    x : xDir*vBallx,
    y : yDir*vBally
  }
}

function ballPosFromHash(hash) {
  var ballPositionXDelta = hashToInt(hash, -10,10);

  return {
    x: 100 + ballPositionXDelta,
    y: boardParams.height / 2
  }
}


function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h/2 && ballY >= paddleY - h/2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x : state.ball.x + initialState.vBall.x / totalPlayers,
      y : state.ball.y + initialState.vBall.y / totalPlayers
    }

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
      ballMovingLeft: ballMovingLeft,
    }
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height),
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft,
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = mod(Math.floor(pos / size), 2);
  return mod(pos, size)*(-2*k + 1) + size*k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', {Load: true})
    .map(function (item) { return item.Entry })
    .sort(compareVotes);
  var initialBucketState = updateInitialState(bucket);
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function hashToInt(hash, minVal, maxVal) {
  return (hash+'').split('').reduce(function (memo, item) {
return (memo + item.charCodeAt(0))
  }, 0) % (maxVal - minVal) + minVal
}



function reverseString (string){
  return string.split("").reverse().join("");
}

function updateInitialState(bucket) {
  var bucketHash = makeHash('gameBucket', bucket);

  var vBall = ballVectorFromHash(bucketHash);
  var ball = ballPosFromHash(bucketHash);

  var newState = {
    ball: ball,
    vBall: vBall,
    paddleL: 50,
    paddleR: 50,
    scoreL: 0,
    scoreR: 0,
    ballMovingLeft: vBall.x < 0
  };

  return newState;
}

/**
 * Rolls back to the correct bucket on an incorrect transition due to race conditions
 *
 * @return     {boolean}  { returns true if current bucket is correct and no change made }
 */
function checkCorrectBucket() {
  var currentBucket = getCachedBucket();
  if(currentBucket.parentHash.length === 0) {
    return currentBucket;
  }
  var prevBucket = get(currentBucket.parentHash);

  var state = getBucketState(prevBucket);
  if(state.scoreL === currentBucket.scoreL && state.scoreR === currentBucket.scoreR) {
    return currentBucket;
  } else {
    setCachedBucket(prevBucket);
    return prevBucket;
  }
}


function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || checkCorrectBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if(state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    if(state.scoreL==10 ||state.scoreR==10){
    var nextBucket = {
      scoreL: 0,
      scoreR: 0,
      gameID: currentBucket.gameID+1,
      parentHash: makeHash('gameBucket', currentBucket)
    }

  }else{
    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID,
      parentHash: makeHash('gameBucket', currentBucket)
    }
  }

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket);
    return getCurrentBucket(nextBucket);
  }
  else {
    return currentBucket;
  }

}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket',bucket,makeHash('cachedGameBucket',prevBucket))
}

function getCachedBucket(hash) {
  var result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length-1];
}


function castVote(vote){

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote",vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  commit('voteLink', {
    Links: [{ Base: anchor(vote.teamID,"GameID"), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID){
  return getLinks(anchor(teamID,"GameID"), 'vote',{Load:true}).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID,"GameID"), 'vote',{Load:true});
  return voteLinks;
}



function joinTeam(team, name) {
  var regoHash = commit("playerRegistration", {teamID: team, agentHash: App.Key.Hash, name: name});
  commit("privatePlayerRegistration", {teamID: team, agentHash: App.Key.Hash, name: name});

  var teamAnchorHash = anchor('members', team);
  commit("teamLink", {
    Links: [{ Base: teamAnchorHash, Link: App.Key.Hash, Tag: "" }]
  });

  var playersAnchorHash = anchor('players', 'players');
  commit("teamLink", {
    Links: [{ Base: playersAnchorHash, Link: regoHash, Tag: "" }]
  });

}
