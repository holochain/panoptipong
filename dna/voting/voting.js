

/*=============================================
=            Public Zome Functions            =
=============================================*/



function getState() {
  var votesL = getLinks(anchor('votes', 'L'), '', { Load: true}).map(function(elem) {
    return elem.Entry;
  });
  var votesR = getLinks(anchor('votes', 'R'), '', { Load: true}).map(function(elem) {
    return elem.Entry;
  });
  return reduceState(initialState, votesL, votesR);
}


function register() {
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

  if( inL || inR) {
    return "AlreadyRegistered";
  }

  var team;
  if(membersL.length <= membersR.length) {
    team = 'L'
  } else {
    team = 'R'
  }
  joinTeam(team);
  return team;
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
        return acc;
    }, initialState.paddleL);
    
    var paddleR = votesR.reduce(function(acc, elem){
        acc += vPaddle * (elem.move / elem.teamR.playerCount);
        return acc;
    }, initialState.paddleR);
    
    var ballReducer = function(acc, elem, i) {
        acc.x += initialBallVelocity.x / (elem.teamL.playerCount + elem.teamR.playerCount);
        acc.y += initialBallVelocity.y / (elem.teamL.playerCount + elem.teamR.playerCount);
        return acc;
    }
    
    ballPos = votesR.reduce(ballReducer, 
        votesL.reduce(ballReducer, initialState.ball));
    
    return {
        ball: ballPos,
        paddleL: paddleL,
        paddleR: paddleR
    }
}


function joinTeam(team) {
  commit("teamDesignation", team);
  var teamAnchorHash = anchor('members', team);
  commit("teamLink", {
    Links: [{ Base: teamAnchorHash, Link: App.Key.Hash, Tag: "" }]
  });
}

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
