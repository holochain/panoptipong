function anchor(anchor) {
  var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
  var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  //debug('<mermaid>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('anchorGet ' + JSON.stringify(anchorGet));
  if (anchorGet === null) {
    var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
    var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    //debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</mermaid>');
    if (anchorTypeGet === null) {
      var rootAnchorTypeHash = makeHash('anchor', rootAnchortype);
      //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>');
      if (get(rootAnchorTypeHash) === null) {
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</mermaid>');
        //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish Root of all anchors</mermaid>');
        // //debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</mermaid>');
      var anchorTypeHash = commit('anchor', anchorType);
      //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</mermaid>');
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</mermaid>');
      // //debug('Anchor Type Created: ' + anchorTypeHash)

      commit('anchor_link', { Links: [{ Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType }] });
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</mermaid>');
    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</mermaid>');
    }
    anchorHash = commit('anchor', anchor);
    //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</mermaid>');
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</mermaid>');
    // //debug('Anchor Created ' + anchorHash)
    commit('anchor_link', { Links: [{ Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText }] });
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</mermaid>');
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchor ' + anchor.anchorType + ' = ' + anchor.anchorText + '</mermaid>');
  return anchorHash;
}

function exists(anchor) {
  //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('does it exist?');
  // //debug(get(makeHash('anchor', anchor)));
  var key = get(makeHash('anchor', anchor));
  // //debug(key);
  if (key !== null) {
    //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</mermaid>');
    return true;
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</mermaid>');
  return false;
}

function anchors(type) {
  var links = getLinks(makeHash('anchor', { anchorType: type, anchorText: '' }), '');
  // //debug(links)
  return links;
}

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  if (entry_type == 'anchor') {
    return true;
  }
  if (entry_type == 'anchor_link') {
    return true;
  }
  return false;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  // //debug('Anchors validateLink:' + sources)
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  // //debug('Anchors validateMod:' + sources)
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  // //debug('Anchors validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  // //debug('Anchors validatePutPkg')
  return null;
}
function validateModPkg(entry_type) {
  // //debug('Anchors validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // //debug('Anchors validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // //debug('Anchors validateLinkPkg')
  return null;
}
function anchor(anchor) {
  var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
  var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  //debug('<mermaid>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('anchorGet ' + JSON.stringify(anchorGet));
  if (anchorGet === null) {
    var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
    var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    //debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</mermaid>');
    if (anchorTypeGet === null) {
      var rootAnchorTypeHash = makeHash('anchor', rootAnchortype);
      //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>');
      if (get(rootAnchorTypeHash) === null) {
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</mermaid>');
        //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish Root of all anchors</mermaid>');
        // //debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</mermaid>');
      var anchorTypeHash = commit('anchor', anchorType);
      //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</mermaid>');
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</mermaid>');
      // //debug('Anchor Type Created: ' + anchorTypeHash)

      commit('anchor_link', { Links: [{ Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType }] });
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</mermaid>');
    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</mermaid>');
    }
    anchorHash = commit('anchor', anchor);
    //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</mermaid>');
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</mermaid>');
    // //debug('Anchor Created ' + anchorHash)
    commit('anchor_link', { Links: [{ Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText }] });
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</mermaid>');
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchor ' + anchor.anchorType + ' = ' + anchor.anchorText + '</mermaid>');
  return anchorHash;
}

function exists(anchor) {
  //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('does it exist?');
  // //debug(get(makeHash('anchor', anchor)));
  var key = get(makeHash('anchor', anchor));
  // //debug(key);
  if (key !== null) {
    //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</mermaid>');
    return true;
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</mermaid>');
  return false;
}

function anchors(type) {
  var links = getLinks(makeHash('anchor', { anchorType: type, anchorText: '' }), '');
  // //debug(links)
  return links;
}

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  if (entry_type == 'anchor') {
    return true;
  }
  if (entry_type == 'anchor_link') {
    return true;
  }
  return false;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  // //debug('Anchors validateLink:' + sources)
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  // //debug('Anchors validateMod:' + sources)
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  // //debug('Anchors validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  // //debug('Anchors validatePutPkg')
  return null;
}
function validateModPkg(entry_type) {
  // //debug('Anchors validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // //debug('Anchors validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // //debug('Anchors validateLinkPkg')
  return null;
}
function anchor(anchor) {
  var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
  var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  //debug('<mermaid>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('anchorGet ' + JSON.stringify(anchorGet));
  if (anchorGet === null) {
    var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
    var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    //debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</mermaid>');
    if (anchorTypeGet === null) {
      var rootAnchorTypeHash = makeHash('anchor', rootAnchortype);
      //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>');
      if (get(rootAnchorTypeHash) === null) {
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</mermaid>');
        //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish Root of all anchors</mermaid>');
        // //debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</mermaid>');
      var anchorTypeHash = commit('anchor', anchorType);
      //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</mermaid>');
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</mermaid>');
      // //debug('Anchor Type Created: ' + anchorTypeHash)

      commit('anchor_link', { Links: [{ Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType }] });
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</mermaid>');
    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</mermaid>');
    }
    anchorHash = commit('anchor', anchor);
    //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</mermaid>');
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</mermaid>');
    // //debug('Anchor Created ' + anchorHash)
    commit('anchor_link', { Links: [{ Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText }] });
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</mermaid>');
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchor ' + anchor.anchorType + ' = ' + anchor.anchorText + '</mermaid>');
  return anchorHash;
}

function exists(anchor) {
  //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('does it exist?');
  // //debug(get(makeHash('anchor', anchor)));
  var key = get(makeHash('anchor', anchor));
  // //debug(key);
  if (key !== null) {
    //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</mermaid>');
    return true;
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</mermaid>');
  return false;
}

function anchors(type) {
  var links = getLinks(makeHash('anchor', { anchorType: type, anchorText: '' }), '');
  // //debug(links)
  return links;
}

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  if (entry_type == 'anchor') {
    return true;
  }
  if (entry_type == 'anchor_link') {
    return true;
  }
  return false;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  // //debug('Anchors validateLink:' + sources)
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  // //debug('Anchors validateMod:' + sources)
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  // //debug('Anchors validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  // //debug('Anchors validatePutPkg')
  return null;
}
function validateModPkg(entry_type) {
  // //debug('Anchors validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // //debug('Anchors validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // //debug('Anchors validateLinkPkg')
  return null;
}
function anchor(anchor) {
  var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
  var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
  var anchorHash = makeHash('anchor', anchor);
  var anchorGet = get(anchorHash);
  //debug('<mermaid>' + App.Agent.String + '->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('anchorGet ' + JSON.stringify(anchorGet));
  if (anchorGet === null) {
    var anchorType = { anchorType: anchor.anchorType, anchorText: '' };
    var rootAnchortype = { anchorType: 'anchorTypes', anchorText: '' };
    var anchorTypeGet = get(makeHash('anchor', anchorType));
    //debug('anchorTypeGet ' + JSON.stringify(anchorTypeGet));
    //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorType + ' has been setup</mermaid>');
    if (anchorTypeGet === null) {
      var rootAnchorTypeHash = makeHash('anchor', rootAnchortype);
      //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if the Root of all anchors has been setup</mermaid>');
      if (get(rootAnchorTypeHash) === null) {
        rootAnchorTypeHash = commit('anchor', rootAnchortype);
        //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit Root of all anchors to local chain</mermaid>');
        //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish Root of all anchors</mermaid>');
        // //debug('Root Anchor Type Created: ' + rootAnchorTypeHash)
      }
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the Root Anchor Type</mermaid>');
      var anchorTypeHash = commit('anchor', anchorType);
      //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorType + ' to local chain</mermaid>');
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorType + '</mermaid>');
      // //debug('Anchor Type Created: ' + anchorTypeHash)

      commit('anchor_link', { Links: [{ Base: rootAnchorTypeHash, Link: anchorTypeHash, Tag: anchorType.anchorType }] });
      //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorType + ' to Root of all anchors</mermaid>');
    } else {
      anchorTypeHash = makeHash('anchor', anchorType);
      //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchorType ' + anchor.anchorType + '</mermaid>');
    }
    anchorHash = commit('anchor', anchor);
    //debug('<mermaid>' + App.Agent.String + '->>' + App.Agent.String + ':commit ' + anchor.anchorText + ' has been setup</mermaid>');
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Publish ' + anchor.anchorText + '</mermaid>');
    // //debug('Anchor Created ' + anchorHash)
    commit('anchor_link', { Links: [{ Base: anchorTypeHash, Link: anchorHash, Tag: anchor.anchorText }] });
    //debug('<mermaid>' + App.Agent.String + '->>DHT:Link ' + anchor.anchorText + ' to ' + anchorType.anchorType + '</mermaid>');
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':Return the anchor ' + anchor.anchorType + ' = ' + anchor.anchorText + '</mermaid>');
  return anchorHash;
}

function exists(anchor) {
  //debug('<mermaid>' + App.Agent.String + '-->>DHT:Check to see if ' + anchor.anchorText + ' exists</mermaid>');
  // //debug('does it exist?');
  // //debug(get(makeHash('anchor', anchor)));
  var key = get(makeHash('anchor', anchor));
  // //debug(key);
  if (key !== null) {
    //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' exists</mermaid>');
    return true;
  }
  //debug('<mermaid>DHT-->>' + App.Agent.String + ':' + anchor.anchorText + ' does not exist</mermaid>');
  return false;
}

function anchors(type) {
  var links = getLinks(makeHash('anchor', { anchorType: type, anchorText: '' }), '');
  // //debug(links)
  return links;
}

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  // //debug('Anchors validatePut:' + sources)
  if (entry_type == 'anchor') {
    return true;
  }
  if (entry_type == 'anchor_link') {
    return true;
  }
  return false;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  // //debug('Anchors validateLink:' + sources)
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  // //debug('Anchors validateMod:' + sources)
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
  // //debug('Anchors validateDel:' + sources)
  return true;
}
function validatePutPkg(entry_type) {
  // //debug('Anchors validatePutPkg')
  return null;
}
function validateModPkg(entry_type) {
  // //debug('Anchors validateModPkg')
  return null;
}
function validateDelPkg(entry_type) {
  // //debug('Anchors validateDelPkg')
  return null;
}
function validateLinkPkg(entry_type) {
  // //debug('Anchors validateLinkPkg')
  return null;
}
/*----------  Anchor API  ----------*/

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}


/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
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

function anchors(anchorType, anchorText) {
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
  commit('cachedGameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  commit('gameBucket', { scoreL: 0, scoreR: 0, gameID: 0 });
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return validateCommit(entry_type, entry, header, pkg, sources);
}
function validateCommit(entry_type, entry, header, pkg, sources) {
  return true;
}

function validateLink(linkingEntryType, baseHash, linkHash, pkg, sources) {
  return true;
}
function validateMod(entry_type, hash, newHash, pkg, sources) {
  return true;
}
function validateDel(entry_type, hash, pkg, sources) {
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

function validateDelPkg(entryType) {
  return null;
}

/*=============================================
=            Public Zome Functions            =
=============================================*/

function getState() {
  var sortedVotes = getBucketState(getCurrentBucket()).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  return calcState(initialState, sortedVotes, boardParams);
}

function compareVotes(a, b) {
  var totalVotesA = a.teamL.voteCount + a.teamR.voteCount;
  var totalVotesB = b.teamL.voteCount + b.teamR.voteCount;

  if (totalVotesA === totalVotesB) {
    return makeHash('vote', a) < makeHash('vote', b) ? -1 : 1;
  } else {
    return totalVotesA - totalVotesB;
  }
}

// REGISTERED YOUR AGENT
function register() {

  // get the number of agents in each team so far
  var membersL = getLinks(anchor('members', 'L'), '');
  var membersR = getLinks(anchor('members', 'R'), '');

  // check the agent is not in any team already
  var inL = membersL.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });
  var inR = membersR.some(function (elem) {
    return elem.Hash === App.Key.Hash;
  });

  if (inL) {
    return 'L';
  }
  if (inR) {
    return 'R';
  }

  var team;
  if (membersL.length <= membersR.length) {
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

  return response[0].teamID || "NotRegistered";
}

function vote(payload) {
  var move = payload.move;

  var nPlayersL = getLinks(anchor('members', 'L'), '').length;
  var nPlayersR = getLinks(anchor('members', 'R'), '').length;

  var nVotesL = countVotes("L");
  var nVotesR = countVotes("R");

  var vote = {
    move: move,
    teamL: { playerCount: nPlayersL, voteCount: nVotesL },
    teamR: { playerCount: nPlayersR, voteCount: nVotesR },
    agentHash: App.Key.Hash,
    randomSalt: "" + Math.random(),
    teamID: getTeam()
  };

  return castVote(vote);
}

/*=====  End of Public Functions  ======*/

/*============================================
=            Local Zome Functions            =
============================================*/

var boardParams = {
  width: 200,
  height: 100,
  paddleWidth: 5,
  paddleHeight: 30,
  ballSize: 3,
  vBallx: 10.0,
  vBally: 4.8,
  vPaddle: 1.3
};

var initialState = {
  ball: {
    x: 60,
    y: 50
  },
  paddleL: 50,
  paddleR: 50,
  scoreL: 0,
  scoreR: 0,
  ballMovingLeft: boardParams.vBallx < 0
};

function calcState(initialState, sortedVotes, boardParams) {

  function isCollision(paddleY, ballY) {
    paddleY = mod(paddleY, boardParams.height);
    ballY = unwrapBallPos(ballY, boardParams.height);
    var h = boardParams.paddleHeight;
    return ballY <= paddleY + h / 2 && ballY >= paddleY - h / 2;
  }

  function reduceState(state, vote) {
    var teamID = vote.teamID;
    var totalPlayers = vote.teamL.playerCount + vote.teamR.playerCount;
    var paddleL = state.paddleL;
    var paddleR = state.paddleR;
    var scoreL = state.scoreL;
    var scoreR = state.scoreR;
    var ball = {
      x: state.ball.x + boardParams.vBallx / totalPlayers,
      y: state.ball.y + boardParams.vBally / totalPlayers
    };

    if (vote.teamID === 'L') {
      paddleL += boardParams.vPaddle * (vote.move / vote.teamL.playerCount);
    } else {
      paddleR += boardParams.vPaddle * (vote.move / vote.teamR.playerCount);
    }

    var ballMovingLeft = Boolean(Math.floor(ball.x / boardParams.width) % 2);
    if (ballMovingLeft !== state.ballMovingLeft) {
      if (!ballMovingLeft && !isCollision(paddleL, ball.y)) {
        scoreR += 1;
      } else if (ballMovingLeft && !isCollision(paddleR, ball.y)) {
        scoreL += 1;
      }
    }
    return {
      ball: ball,
      paddleL: paddleL,
      paddleR: paddleR,
      scoreL: scoreL,
      scoreR: scoreR,
      ballMovingLeft: ballMovingLeft
    };
  }

  var reducedState = sortedVotes.reduce(reduceState, initialState);

  return {
    paddleL: mod(reducedState.paddleL, boardParams.height),
    paddleR: mod(reducedState.paddleR, boardParams.height),
    ball: {
      x: unwrapBallPos(reducedState.ball.x, boardParams.width),
      y: unwrapBallPos(reducedState.ball.y, boardParams.height)
    },
    scoreL: reducedState.scoreL,
    scoreR: reducedState.scoreR,
    ballMovingLeft: reducedState.ballMovingLeft
  };
}

function mod(n, m) {
  return (n % m + m) % m;
}

function unwrapBallPos(pos, size) {
  var k = Math.floor(pos / size) % 2;
  return pos % size * (-2 * k + 1) + size * k;
}

function getBucketState(bucket) {
  var sortedVotes = getLinks(makeHash('gameBucket', bucket), 'vote', { Load: true }).map(function (item) {
    return item.Entry;
  }).sort(compareVotes);
  var initialBucketState = initialState; // TODO: actually make a fresh new state for each anchor based on hash
  initialBucketState.scoreL = bucket.scoreL;
  initialBucketState.scoreR = bucket.scoreR;
  return calcState(initialBucketState, sortedVotes, boardParams);
}

function getCurrentBucket(_currentBucket) {
  var currentBucket = _currentBucket || getCachedBucket();

  //  get the state on the cached bucket as currentBucket
  var state = getBucketState(currentBucket);

  if (state.scoreL > currentBucket.scoreL || state.scoreR > currentBucket.scoreR) {

    var nextBucket = {
      scoreL: state.scoreL,
      scoreR: state.scoreR,
      gameID: currentBucket.gameID
    };

    commit('gameBucket', nextBucket); // in case we are the first person to notice the score
    setCachedBucket(nextBucket, currentBucket); // TODO actually make work
    return getCurrentBucket(nextBucket);
  } else {
    return currentBucket;
  }
}

function setCachedBucket(bucket, prevBucket) {
  update('cachedGameBucket', bucket, makeHash('cachedGameBucket', prevBucket));
}

function getCachedBucket(hash) {
  result = query({
    Constrain: {
      EntryTypes: ['cachedGameBucket']
    }
  });
  // Returns the last entry because its the most updated values
  return result[result.length - 1];
}

function castVote(vote) {

  var currentBucket = getCurrentBucket();

  voteHash = commit("vote", vote);
  // On the DHT, puts a link on my anchor to the new post
  commit('voteLink', {
    Links: [{ Base: makeHash('gameBucket', currentBucket), Link: voteHash, Tag: 'vote' }]
  });

  return voteHash;
}

/*
Count the vote for one team
*/

//@param :  teamID:string
function countVotes(teamID) {
  return getLinks(anchor(teamID, "GameID"), 'vote', { Load: true }).length;
}

/*
Used for getting the list of votes commited
*/
//@param :  teamID:string
function getVoteList(teamID) {
  var voteLinks = getLinks(anchor(teamID, "GameID"), 'vote', { Load: true });
  return voteLinks;
}

function joinTeam(team) {
  commit("teamDesignation", team);
  var teamAnchorHash = anchor('members', team);
  commit("teamLink", {
    Links: [{ Base: teamAnchorHash, Link: App.Key.Hash, Tag: "" }]
  });
}
