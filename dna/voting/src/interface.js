
/*=============================================
=            Public Zome Functions            =
=============================================*/


function getState() {
  var sortedVotes =
    getVoteList('L')
    .concat(getVoteList('R'))
    .map(function (item) { return item.Entry })
    .sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

// REGISTERED YOUR AGENT
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
