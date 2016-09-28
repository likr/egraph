/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const newman = require('../../../network/community/newman')

describe('newman(graph)', () => {
  it('returns communities', () => {
    const graph = new Graph()
    const [a, b, c, d, e, f] = [0, 1, 2, 3, 4, 5]
    graph.addVertex(a)
    graph.addVertex(b)
    graph.addVertex(c)
    graph.addVertex(d)
    graph.addVertex(e)
    graph.addVertex(f)
    graph.addEdge(a, b)
    graph.addEdge(a, c)
    graph.addEdge(a, d)
    graph.addEdge(b, c)
    graph.addEdge(d, e)
    graph.addEdge(d, f)
    graph.addEdge(e, f)
    assert.deepEqual(newman(graph), {
      [a]: a,
      [b]: a,
      [c]: a,
      [d]: d,
      [e]: d,
      [f]: d
    })
  })
})
