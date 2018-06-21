
/*=============================================
=            Public zome functions            =
=============================================*/

function getLinkGraph() {
  // start at the root DNA hash
  var elements = [{
    group: 'nodes',
    data: {id: App.DNA.Hash}
  }];

  return traverseAndAppend(App.DNA.Hash, elements);
}


function traverseAndAppend(base, elements) {
  var targets = getLinks(base, '');
  targets.forEach(function(target) {
    elements.push({
      group: 'nodes',
      data: {id: target.Hash}
    });
    elements.push({
      group: 'edges',
      data: {id: base+'->'+target.Hash, source: base, target: target.Hash}
    });
    elements = traverseAndAppend(target.Hash, elements);
  });
  return elements
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