
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
      x : state.ball.x + boardParams.vBallx / totalPlayers,
      y : state.ball.y + boardParams.vBally / totalPlayers
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

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1
  } else {
    return totalVotesA - totalVotesB;
  }
}

function voteStamp(vote) {
  var totalVotes = vote.teamL.voteCount + vote.teamR.voteCount;
  return String(totalVotes) + makeHash('vote', vote);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return (pos % size)*(-2*k + 1) + size*k;
}

