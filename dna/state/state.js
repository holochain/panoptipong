var OPEN_BUCKET_HASH = makeHash('openBucketIndex');


function getBucketHash(bucket) {
  return anchor('bucket', '' + bucket.index)
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
    index = result.Entry;
  }
  var startIndex = index;
  while(isBucketFull(index)) {
    index += 1
  }
  if (startIndex < index || !cacheExists) {
    if (cacheExists) {
      update('openBucketIndex', index, result.Hash)
    } else {
      commit('openBucketIndex', index)
    }
  }
  return index;
}

function isBucketFull(index) {
  var hash = getBucketHash({index: index})
  return getLinks(hash, '').length >= BUCKET_SIZE;
}

// var total = getLinks(anchor('bucket', ''), '').length;