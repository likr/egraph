/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const baryCenter = require('../../../../layouter/sugiyama/crossing-reduction/bary-center')

describe('baryCenter(g, h1, h2)', () => {
  it('sorts h2', () => {
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
    baryCenter(graph, h1, h2)
    assert.deepEqual(h2, [v2, v3, v1])
  })

  it('sorts h2', () => {
    const [u, v, w] = [Symbol(), Symbol(), Symbol()]
    const graph = new Graph()
      .addVertex(u)
      .addVertex(v)
      .addVertex(w)
      .addEdge(u, v)
      .addEdge(u, w)
    const h1 = [u]
    const h2 = [v, w]
    baryCenter(graph, h1, h2)
    assert.deepEqual(h2, [v, w])
  })
})

describe('baryCenter(g, h1, h2, true)', () => {
  it('sorts h1', () => {
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
    baryCenter(graph, h1, h2, true)
    assert.deepEqual(h1, [u1, u3, u4, u2])
  })
})
