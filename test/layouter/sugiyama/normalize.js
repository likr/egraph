/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const normalize = require('../../../layouter/sugiyama/normalize')

describe('normalize(g, layers, layerMap, edgeMargin)', () => {
  it('inserts dummy vertices and edges', () => {
    const [a, b, c] = [0, 1, 2]
    const graph = new Graph()
      .addVertex(a, {layer: 0})
      .addVertex(b, {layer: 1})
      .addVertex(c, {layer: 2})
      .addEdge(a, b)
      .addEdge(b, c)
      .addEdge(a, c)
    const layers = [[a], [b], [c]]
    const layerMap = {
      [a]: 0,
      [b]: 1,
      [c]: 2
    }
    normalize(graph, layers, layerMap, 5)
    const d = graph.vertices()[3]
    assert.equal(graph.numVertices(), 4)
    assert.equal(graph.numEdges(), 4)
    assert(graph.vertex(d).dummy)
    assert(graph.edge(a, d).dummy)
    assert(graph.edge(d, c).dummy)
    assert.deepEqual(layers, [[a], [b, d], [c]])
  })
})
