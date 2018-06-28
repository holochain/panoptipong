
require('babel-polyfill');  // for Promise()
const test = require('tape');

const fakeVote = salt => ({
  "move" : -1,
  "teamL": 0,
  "teamR": 0,
  "agentHash": "fake",
  "randomSalt": ''+salt,
  "teamID": "L"
})

const N = 10;

scenario(2, (alice, bob) => {
  test('alice can read her own links, and so can bob', t => {
    alice(() => {
      const anc = anchor("L", "GameID")
      for (let i=0; i < N; i++) {
        const voteHash = commit('vote', fakeVote(''+i))
        commit('voteLink', {
          Links: [{ Base: anc, Link: voteHash, Tag: 'vote' }]
        });
      }
      const links = getLinks(anc, '')
      t.equal(links.length, N)
    })

    bob(() => {
      const anc = anchor("L", "GameID")
      setTimeout(() => {
        const links = getLinks(anc, '')
        t.equal(links.length, N)
        t.end()
      }, 100)
    })
  })

  test('alice can still read her own links in a new context', t => {
    alice(() => {
      const anc = anchor("L", "GameID")
      setTimeout(() => {
        const links = getLinks(anc, '')
        t.equal(links.length, N)
        t.end()
      }, 100)
    })
  })
});

scenario(1, agent => {
  test('new scenario -> new holochain -> no links', t => {
    const links = agent(() => getLinks(anchor("L", "GameID"), ''))
    t.equal(links.length, 0)
    t.end()
  })
})
