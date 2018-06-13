// Cast you first Vote and save it localy

function genesis() {
  return true;
}

/**
CREATED FOR VOTES STORED IN LOCAL AND NOT TO THE DHT

**/

//The initial vote
//vote = {data:""}
function castVote(vote){
  voteHash = commit("vote", vote.data);
  return voteHash;
}

// update your vote Local
/*ISSUE ; have to manage the vote hash is the data has to be stored in the local Chain*/
// update = {data="",voteHash:""}
function updateVote(updateVote){
  voteHash = update("vote",updateVote.data,updateVote.voteHash);
  return voteHash;
}


// send the vote state to the progenetor
//vote = {hash:""}
function sendVoteProgenitor(vote){
  voteData=getVote(vote.hash);

  // TODO send to the Progenitor

}

function getVote(hash){
  vote=get(hash, { Local: true });
  return vote;
}



function validatePut(entry_type,entry,header,pkg,sources) {
  return validateCommit(entry_type,entry,header,pkg,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    if (entry_type == 'vote') {
        return true;
    }
    return false;
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
