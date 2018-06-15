var RenderPong = require('./renderPong')

const vBall = 3.0 // how far the ball will move in a  'turn'
const vPaddle = 1.3; // how far the paddle can possible move in a 'turn'
const initialBallVelocity =  {x: vBall*Math.sqrt(2)+0.1, y: vBall*Math.sqrt(2)};


const initialState = {
  ball: {
      x: 60,
      y: 50
  },
  paddleL: 50,
  paddleR: 50
};

const boardParams = {
  width: 300,
  height: 150,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize:3
};

var votesL = [];
var votesR = [];


for(var i = 0; i < 1000; i++) {
  // randomly vote up or down from each team
  votesL.push({
    move: Math.round(Math.random()*2 - 1), 
    teamL: {playerCount: 1}, 
    teamR: {playerCount: 1}
  });

  votesR.push({
    move: Math.round(Math.random()*2 - 1), 
    teamL: {playerCount: 1}, 
    teamR: {playerCount: 1}
  });

  var state = reduceState(initialState, votesL, votesR);
  console.log(state);
  RenderPong.renderGameState(state, i, boardParams, './outputs/testStateUpdates/');
}


function reduceState(initialState, votesL, votesR) {

    var paddleL =  votesL.reduce(function(acc, elem) {
        return acc + vPaddle * (elem.move / elem.teamL.playerCount);
    }, initialState.paddleL);

    var paddleR = votesR.reduce(function(acc, elem){
        return acc + vPaddle * (elem.move / elem.teamR.playerCount);
    }, initialState.paddleR);

    var ballReducer = function(acc, elem, i) {
        return {
          x : acc.x + initialBallVelocity.x / (elem.teamL.playerCount + elem.teamR.playerCount),
          y : acc.y + initialBallVelocity.y / (elem.teamL.playerCount + elem.teamR.playerCount)
        };
    };

    var ballPos = votesR.reduce(ballReducer,
        votesL.reduce(ballReducer, initialState.ball));

    return {
        ball: { x: unwrapBallPos(ballPos.x, boardParams.width), y: unwrapBallPos(ballPos.y, boardParams.height) },
        paddleL: mod(paddleL, boardParams.height),
        paddleR: mod(paddleR, boardParams.height)
    };
}


function mod(n, m) {
  return ((n % m) + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return (pos % size)*(-2*k + 1) + size*k;
}