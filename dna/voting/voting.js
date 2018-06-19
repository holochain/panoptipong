

/*=============================================
=            Public Zome Functions            =
=============================================*/



function getState() {
  return reduceState(initialState, getVoteList('L').map(function(elem){
    return elem.Entry;
  }), getVoteList('R').map(function(elem){
    return elem.Entry;
  }));
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

  if(inL) { return 'L' }
  if(inR) { return 'R' }

  var team;
  if(membersL.length <= membersR.length) {
    team = 'L';
  } else {
    team = 'R';
  }
  joinTeam(team);
  debug(team);
  return team;
}


function getTeam() {
  var response = query({
    Return: {
      Entries: true
    },
    Constrain: {
      EntryTypes: ["teamDesignation"],
      Count: 1
    }
  });

  return response[0] || "NotRegistered";
}


function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL =countVotes("L");
  var nVotesR =countVotes("R");

  var vote = {
    move: move,
    teamL: {playerCount: nPlayersL, voteCount: nVotesL},
    teamR: {playerCount: nPlayersR, voteCount: nVotesR},
    agentHash: App.Key.Hash,
    randomSalt: ""+Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var vBall = 3.0 // how far the ball will move in a  'turn'
var vPaddle = 1.3; // how far the paddle can possible move in a 'turn'
var initialBallVelocity = {x: vBall*Math.sqrt(2)+0.1, y: vBall*Math.sqrt(2)};


var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize:3
};


var initialState = {
  ball: {
      x: 60,
      y: 50
  },
  paddleL: 50,
  paddleR: 50
};


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


//VOTE
//vote = {teamID:"",move:"",teamL:{payerCount:"",voteCount:""},teamR:{payerCount:"",voteCount:""},agentHash:"",randomSalt:"",}
//NOTE: if you want to have mutiple games, you woud need the GameID too;
function castVote(vote){
  if(anchorExists(vote.teamID,"GameID")==="false"){
    anchor(vote.teamID,"GameID");
  }

  voteHash = commit("vote",vote);
  // On the DHT, puts a link on my anchor to the new post
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
  // debug("Votes Casted by "+teamID+" : "+JSON.stringify(voteLinks));
  debug("Number of votes: "+Object.keys(voteLinks).length);
  return voteLinks;
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
