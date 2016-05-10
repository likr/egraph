/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const cycleEdges = require('../../../../layouter/sugiyama/cycle-removal/cycle-edges')

describe('cycleEdges(g)', () => {
  it('returns cycle edges of g', () => {
    const [a, b, c] = [0, 1, 2]
    const graph = new Graph()
      .addVertex(a)
      .addVertex(b)
      .addVertex(c)
      .addEdge(a, b)
      .addEdge(b, c)
      .addEdge(c, a)
    const edges = cycleEdges(graph)
    assert.equal(edges.length, 1)
    assert.equal(edges[0][0], c)
    assert.equal(edges[0][1], a)
  })
})
