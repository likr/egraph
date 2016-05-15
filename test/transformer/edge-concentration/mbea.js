/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const mbea = require('../../../transformer/edge-concentration/mbea')

describe('mbea(g, h1, h2)', () => {
  it('returns edge concentrations', () => {
    const h1 = [0, 1, 2]
    const h2 = [3, 4, 5, 6, 7, 8, 9, 10, 11]
    const [u1, u2, u3] = h1
    const [v1, v2, v3, v4, v5, v6, v7, v8, v9] = h2
    const graph = new Graph()
      .addVertex(u1)
      .addVertex(u2)
      .addVertex(u3)
      .addVertex(v1)
      .addVertex(v2)
      .addVertex(v3)
      .addVertex(v4)
      .addVertex(v5)
      .addVertex(v6)
      .addVertex(v7)
      .addVertex(v8)
      .addVertex(v9)
      .addEdge(u1, v1)
      .addEdge(u1, v2)
      .addEdge(u1, v3)
      .addEdge(u1, v4)
      .addEdge(u1, v5)
      .addEdge(u1, v6)
      .addEdge(u1, v7)
      .addEdge(u2, v1)
      .addEdge(u2, v2)
      .addEdge(u2, v3)
      .addEdge(u2, v4)
      .addEdge(u2, v5)
      .addEdge(u2, v6)
      .addEdge(u2, v7)
      .addEdge(u2, v8)
      .addEdge(u2, v9)
      .addEdge(u3, v3)
      .addEdge(u3, v4)
      .addEdge(u3, v5)
      .addEdge(u3, v6)
      .addEdge(u3, v7)
      .addEdge(u3, v8)
      .addEdge(u3, v9)

    const result = mbea(graph, h1, h2)
    assert.deepEqual(result, [
      { source: [ 1, 2 ], target: [ 5, 6, 7, 8, 9, 10, 11 ] }
    ])
  })
})
