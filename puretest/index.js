
require('babel-polyfill');
const test = require('tape');

const fakeVote = salt => ({
  "move" : -1,
  "teamL": 0,
  "teamR": 0,
  "agentHash": "fake",
  "randomSalt": salt,
  "teamID": "L"
})

test('simple test', t => {
  scenario(2, (alice, bob) => {
    alice(() => {
      commit('vote', {
        "move" : -1,
        "teamL": 0,
        "teamR": 0,
        "agentHash": "iausdhfouishdf",
        "randomSalt": "089hw",
        "teamID": "L"
      })
    })

    bob(() => {
      const anc = anchor("L", "GameID")
      for (let i=0; i < 100; i++) {
        const voteHash = commit('vote', fakeVote(''+i))
        commit('voteLink', {
          Links: [{ Base: anc, Link: voteHash, Tag: 'vote' }]
        });
      }
      const links = getLinks(anc, '')
      t.equal(links.length, 100)
    })

    bob(() => {
      const anc = anchor("L", "GameID")
      setTimeout(() => {
        const links = getLinks(anc, '')
        t.equal(links.length, 100)
        t.end()
      }, 500)
    })
  })

});
