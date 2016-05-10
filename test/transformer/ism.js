/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../graph')
const IsmTransformer = require('../../transformer/ism')

describe('IsmTransformer ', () => {
  describe('transform(g)', () => {
    it('returns transformed graph', () => {
      const u = 0
      const v = 1
      const w = 2
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      const transformed = new IsmTransformer().transform(graph)
      assert(transformed.edge(u, v))
      assert(transformed.edge(v, w))
      assert(!transformed.edge(u, w))
    })
  })
})
