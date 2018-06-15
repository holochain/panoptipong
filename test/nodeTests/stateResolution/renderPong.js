fs = require('fs');
var Canvas = require('canvas')

module.exports.renderGameState = function(state, i, boardParams) {

  var Image = Canvas.Image, 
      canvas = new Canvas(boardParams.width, boardParams.height),
      ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  
  ctx.rect(0, 0, boardParams.width, boardParams.height);
  ctx.fillStyle = 'black';
  ctx.fill();

  //draw the ball
  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, boardParams.ballSize, 0, Math.PI*2, true); 
  ctx.closePath();
  ctx.fillStyle = 'green';
  ctx.fill();

  //draw the paddles
  ctx.rect(0, -0.5*boardParams.paddleHeight + state.paddleL, boardParams.paddleWidth, boardParams.paddleHeight);
  ctx.rect(boardParams.width, -0.5*boardParams.paddleHeight + state.paddleR, -boardParams.paddleWidth, boardParams.paddleHeight);
  ctx.fillStyle = 'green';
  ctx.fill();


  var fileName = (""+i).padStart(5, "0");
  writeCanvasToFile(canvas, './frames/'+fileName+'.png');
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




