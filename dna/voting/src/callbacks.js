

// Cast you first Vote and save it localy

function genesis() {
  currentBucket={scoreL: 0, scoreR: 0, gameID: 0, parentHash: ''};
  commit('cachedGameBucket', currentBucket);
  commit('gameBucket', {scoreL: 0, scoreR: 0, gameID: 0, parentHash: ''});
  //currentBucket=climbUpBucket(currentBucket);

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

function validateLink(entryType, hash, links, pkg, sources) {
  return true;
}

function validateDelPkg (entryType) {
return null;
}
