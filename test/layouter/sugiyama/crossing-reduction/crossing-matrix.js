/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const crossingMatrix = require('../../../../layouter/sugiyama/crossing-reduction/crossing-matrix')

describe('crossingMatrix(g, h1, h2)', () => {
  it('returns crossing matrix', () => {
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
    const h1 = [u1, u2, u3, u4]
    const h2 = [v1, v2, v3]
    const result = crossingMatrix(graph, h1, h2)
    assert.equal(result[0], 0)
    assert.equal(result[1], 2)
    assert.equal(result[2], 1)
    assert.equal(result[3], 1)
    assert.equal(result[4], 0)
    assert.equal(result[5], 2)
    assert.equal(result[6], 0)
    assert.equal(result[7], 3)
    assert.equal(result[8], 0)
  })
})
