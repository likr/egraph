/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const quasiBicliqueMining = require('../../../transformer/edge-concentration/quasi-biclique-mining')

describe('quasiBicliqueMining(graph, h1, h2, mu)', () => {
  it('return maximal mu-quasi-bicliques', () => {
    const h1 = [1, 2, 3, 4, 5]
    const h2 = [11, 12, 13, 14, 15, 16]
    const graph = new Graph()
    for (const u of h1) {
      graph.addVertex(u)
    }
    for (const u of h2) {
      graph.addVertex(u)
    }
    graph.addEdge(1, 11)
    graph.addEdge(1, 12)
    graph.addEdge(2, 12)
    graph.addEdge(2, 13)
    graph.addEdge(2, 14)
    graph.addEdge(3, 12)
    graph.addEdge(3, 13)
    graph.addEdge(3, 14)
    graph.addEdge(4, 13)
    graph.addEdge(4, 14)
    graph.addEdge(5, 14)
    graph.addEdge(5, 15)
    graph.addEdge(5, 16)

    assert(quasiBicliqueMining(graph, h1, h2, 0.5))
  })
})
