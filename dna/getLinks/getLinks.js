
/*=============================================
=            Public zome functions            =
=============================================*/

/**
 * Gets the links.
 *
 * @param      {Object}  payload  The payload
 * @param      {string} payload.QueryType Defines the type of getLinks query. Must be in ["hash", "anchor", "dna", "key"]
 * @param      {} payload.QueryData Depending on the type either contains a hash, {anchorType:"", anchorText:""} object, or nothing for a dna or key query 
 * @param      {string} payload.tag return only links with this tag. If not defined then will return all along with a tag attribute
 * @param      {Object} payload.Options identical to options in the Holochain api get links.
 * @param      {boolean} payload.Options.Load - If the target data should be loaded and returned
 * @param      {Status-int} payload.Options.StatusMask - What status of links should be returned
 * 
 * @returns    {Object} - Depending on Options returns either a list identical to that from getList in the api
 */
function getLinks(payload) {
  var baseHash;
  var tag = payload.tag || '';
  switch(payload.QueryType) {
    case "hash":
      baseHash = payload.QueryData;
      break;
    case "anchor":
      if (anchorExists(payload.QueryData.anchorType, payload.QueryData.anchorText)) {
        baseHash = anchor(payload.QueryData.anchorType, payload.QueryData.anchorText);
      } else {
        return "NoSuchAnchor";
      }
      break;
    case "dna":
      baseHash = App.DNA.Hash;
      break;
    case "key":
      baseHash = App.Key.Hash;
      break;
    default:
      return "InvalidQueryType";
  }
  return getLinks(baseHash, tag, payload.Options);

}


/*=====  End of Public zome functions  ======*/


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

/*----------  End Anchor API  ----------*/

function genesis() {
  return true
}

function validateCommit() {
  return true
}

function validatePut() {
  return true
}

function validateLink() {
  return true
}