
const BUCKET_SIZE = 10;

const boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize:3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3,
};


const initialState = {
  ball: {
      x: 60,
      y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0,
};

