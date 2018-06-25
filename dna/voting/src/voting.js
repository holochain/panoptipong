
//VOTE
//vote = {teamID:"",move:"",teamL:{payerCount:"",voteCount:""},teamR:{payerCount:"",voteCount:""},agentHash:"",randomSalt:"",}
//NOTE: if you want to have mutiple games, you would need the GameID too;
function castVote(vote){
  var bucketIndex = getOpenBucketIndex();
  var anchorHash = anchor("bucket", bucketIndex+"");

  voteHash = commit("vote",vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: anchorHash, Link: voteHash, Tag: 'vote' }]
  });
  var sealed = makeSeal(bucketIndex);
  return voteHash;
}

function makeSeal(bucketIndex){
  var anchorHash = anchor('bucket', bucketIndex+"");
  var bucketVoteCount = getLinks(anchorHash, 'vote').length;
  if (bucketVoteCount >= BUCKET_SIZE) {
    var bucketVotes = getLinks(anchorHash, 'vote', { Load : true});
    var sortedVotes = bucketVotes.map(function (item) { return item.Entry }).sort(compareVotes);
    var sealingVote = sortedVotes[BUCKET_SIZE-1];
    //TODO: replace with calculated state
    //var state = calcState(getSealedBucketState(bucketIndex-1), sortedVotes.slice(0, BUCKET_SIZE));
    var state = calcState(initialState, sortedVotes.slice(0, BUCKET_SIZE), boardParams);
    var voteCount = (bucketIndex+1)*BUCKET_SIZE;
    var seal = {
      "voteHash" : makeHash('vote', sealingVote),
      "voteCount" : voteCount,
      "gameState" : state
    }
    var sealHash = commit('seal', seal);
    commit('voteLink', {
      Links: [{ Base: anchorHash, Link: sealHash, Tag: 'seal' }]
    });
    return true;
  }
  return false;
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
  return voteLinks;
}

function joinTeam(team) {
  commit("teamDesignation", team);
  var teamAnchorHash = anchor('members', team);
  commit("teamLink", {
    Links: [{ Base: teamAnchorHash, Link: App.Key.Hash, Tag: "" }]
  });
}

