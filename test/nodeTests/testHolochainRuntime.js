const axios = require('axios');
const sleep = require('sleep');
const RenderPong = require('./renderPong')

const nIter = 100;
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
  })
  .then(gameLoop)
  .catch(error => {
    console.log(error);
  });


async function gameLoop() {
  for (var i = 0; i < nIter; i++) {
  
    console.log('interation: '+i);

    await axios.post(VOTE, JSON.stringify({move: -1}))

    var response = await axios.post(GET_STATE)
    console.log(response.data);
    RenderPong.renderGameState(response.data, i, boardParams, './outputs/testHolochainRuntime/');
  }
}

