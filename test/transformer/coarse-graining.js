/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../graph')
const CoarseGrainingTransformer = require('../../transformer/coarse-graining')

describe('CoarseGrainingTransformer', () => {
  describe('transform(graph)', () => {
    it('should return transformed graph', () => {
      const transformer = new CoarseGrainingTransformer()
        .vertexVisibility(({d}) => {
          return d.visible
        })
      const graph = new Graph()
      const u = Symbol()
      const v1 = Symbol()
      const v2 = Symbol()
      const w = Symbol()
      graph.addVertex(u, {visible: true})
      graph.addVertex(v1, {visible: false})
      graph.addVertex(v2, {visible: false})
      graph.addVertex(w, {visible: true})
      graph.addEdge(u, v1)
      graph.addEdge(u, v2)
      graph.addEdge(v1, w)
      graph.addEdge(v2, w)

      const graph2 = transformer.transform(graph)
      assert.equal(graph2.numVertices(), 2)
      assert.equal(graph2.numEdges(), 1)
      assert.ok(graph2.edge(u, w))
    })
  })
})
