/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const cross = require('../../../../layouter/sugiyama/crossing-reduction/cross')

describe('cross(g, h1, h2)', () => {
  it('returns the number of crossing', () => {
    const [u1, u2, u3, u4] = [0, 1, 2, 3]
    const [v1, v2, v3] = [4, 5, 6]
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(u4)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addEdge(u1, v2)
      .addEdge(u2, v2)
      .addEdge(u2, v3)
      .addEdge(u3, v1)
      .addEdge(u3, v3)
      .addEdge(u4, v2)
    assert.equal(cross(graph, [u1, u2, u3, u4], [v1, v2, v3]), 5)
  })
})
