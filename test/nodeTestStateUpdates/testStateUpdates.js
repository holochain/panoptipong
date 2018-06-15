fs = require('fs');


var vBall = 3.0 // how far the ball will move in a  'turn'
var vPaddle = 1.3; // how far the paddle can possible move in a 'turn'
var initialBallVelocity =  {x: vBall*Math.sqrt(2)+0.1, y: vBall*Math.sqrt(2)};

var width=300, height=100;
var paddleHeight = 30;

var initialState = {
  ball: {
      x: 60,
      y: 50
  },
  paddleL: 50,
  paddleR: 50
};

var votesL = [];
var votesR = [];
var standardMove = {move: 0, teamL: {playerCount: 1}, teamR: {playerCount: 0}};


var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(width, height)
  , ctx = canvas.getContext('2d');

ctx.strokeStyle = 'rgba(0,0,0,0.5)';

for(var i = 0; i < 300; i++) {
  votesL.push(standardMove);
  var state = reduceState(initialState, votesL, votesR);

  //draw a circle
  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, 1, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fill();
  var fileName = (""+i).padStart(5, "0");
  writeCanvasToFile(canvas, './frames/'+fileName+'.png');
  console.log(state);
}
 
function renderGameState(state) {

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
        ball: { x: unwrapBallPos(ballPos.x, width), y: unwrapBallPos(ballPos.y, height) },
        paddleL: mod(paddleL, height),
        paddleR: mod(paddleR, height)
    };
}


function mod(n, m) {
  return ((n % m) + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return (pos % size)*(-2*k + 1) + size*k;
}

function writeCanvasToFile(canvas, filename) {
  var img = canvas.toDataURL();
  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  fs.writeFile(filename, buf, function(err) {
    console.log('file saved to '+filename);
  });
}



