const axios = require('axios');
const sleep = require('sleep');
const RenderPong = require('./renderPong')

const nIter = 1;
const waitTime = 5000; //ms

const HC_ENDPOINT = 'http://localhost:4141/fn/voting/';
const REGISTER = HC_ENDPOINT+'register';
const VOTE = HC_ENDPOINT+'vote';
const GET_STATE = HC_ENDPOINT+'getState';

const boardParams = {
  width: 300,
  height: 150,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize:3
};




// register on start
axios.post(REGISTER)
  .then(response => {
    console.log("Agent assigned to team: " + response.data);
    gameLoop();
  })
  .catch(error => {
    console.log(error);
  });


function gameLoop() {
  for (var i = 0; i < nIter; i++) {
    // sleep.msleep(waitTime);
    console.log('interation: '+i);

    axios.post(VOTE, JSON.stringify({move: -1}))
      .then(response => {
        console.log("Vote was successfully cast");
        axios.post(GET_STATE)
          .then(response => {
            console.log(response.data);
            var state = response.data;
            RenderPong.renderGameState(state, i, boardParams, './outputs/testHolochainRuntime/');
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

