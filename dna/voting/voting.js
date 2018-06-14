

/*=============================================
=            Public Zome Functions            =
=============================================*/



function getState() {

}


function register() {

}


function vote(payload) {
  
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var vBall = 2.3; // how far the ball will move in a  'turn'
var vPaddle = 1.3; // how far the paddle can possible move in a 'turn'
var initialBallVelocity =  {x: vBall*Math.sqrt(2), y: vBall*Math.sqrt(2)}

var width=300, height=100;
var paddleHeight = 30;

var initialState = {
  ball: {
      x: 60,
      y: 50
  },
  paddleL: 50,
  paddleR: 50
}

function reduceState(initialState, votesL, votesR) {

    var paddleL =  votesL.reduce(function(acc, elem) {
        acc += vPaddle * (elem.move / elem.teamL.playerCount);
    }, initialState.paddleL);
    
    var paddleR = votesR.reduce(function(acc, elem){
        acc += vPaddle * (elem.move / elem.teamR.playerCount);
    }, initialState.paddleR);
    
    var ballReducer = function(acc, elem, i) {
        acc.x += initialBallVelocity.x / (elem.teamL.playerCount + elem.teamR.playerCount);
        acc.y += initialBallVelocity.y / (elem.teamL.playerCount + elem.teamR.playerCount);
    }
    
    ballPos = votesR.reduce(ballReducer, 
        votesL.reduce(ballReducer, initialState.ball));
    
    return {
        ball: ballPos,
        paddleL: paddleL,
        paddleR: paddleR
    }
}

/*=====  End of Local Zome Functions  ======*/




// Cast you first Vote and save it localy

function genesis() {
  return true;
}


function validatePut(entry_type,entry,header,pkg,sources) {
  return validateCommit(entry_type,entry,header,pkg,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return true;
}

function validateLink(linkingEntryType,baseHash,linkHash,pkg,sources){
  return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources){
  return true;
}
function validateDel(entry_type,hash,pkg,sources) {
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

function validateLink(entryType, hash, links, package, sources) {
  return true;
}

function validateDelPkg (entryType) {
return null;
}
