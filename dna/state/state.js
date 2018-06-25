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
var BUCKET_SIZE = 100;

function getBucketHash(bucket) {
  return anchor('bucket', '' + bucket.index);
}

// function getNumberOfBuckets() {
//   var total = getLinks(anchor('bucket', ''), '').length;
//   get(OPEN_BUCKET_HASH)
//   commit("openBucketIndex", total - 1); // TODO: add as private entry
//   return total;
// }
//
function getCachedOpenBucketEntry() {
  var results = query({
    Return: {
      Hashes: true,
      Entries: true
    },
    Constrain: {
      EntryTypes: ['openBucketIndex']
    }
  });
  if (results.length === 0) {
    return null;
  } else {
    return results[0];
  }
}

function getOpenBucketIndex() {
  var cacheExists = false;
  var result = getCachedOpenBucketEntry();
  var index = 0;
  if (result) {
    cacheExists = true;
    index = parseInt(result.Entry, 10);
  }
  var startIndex = index;
  while (isBucketFull(index)) {
    index += 1;
  }
  if (startIndex < index || !cacheExists) {
    if (cacheExists) {
      update('openBucketIndex', index, result.Hash);
    } else {
      commit('openBucketIndex', index);
    }
  }
  return index;
}

function isBucketFull(data) {
  var hash = getBucketHash({ index: data.index });
  var size = getLinks(hash, '').length;
  debug(size);
  return size >= data.capacity;
}

function genesis() {
  return true;
}

function validatePut(entry_type, entry, header, pkg, sources) {
  return true;
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
