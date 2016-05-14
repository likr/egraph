/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const completeQB = require('../../../transformer/edge-concentration/complete-qb')

describe('completeQb(graph, h1, h2, epsilon)', () => {
  it('return maximal epsilon-quasi-bicliques', () => {
    const h1 = [1, 2, 3, 4, 5, 6]
    const h2 = [7, 8, 9, 10, 11, 12]
    const graph = new Graph()
    for (const u of h1) {
      graph.addVertex(u)
    }
    for (const u of h2) {
      graph.addVertex(u)
    }
    graph.addEdge(1, 7)
    graph.addEdge(1, 8)
    graph.addEdge(1, 10)
    graph.addEdge(1, 11)
    graph.addEdge(1, 12)
    graph.addEdge(2, 9)
    graph.addEdge(2, 10)
    graph.addEdge(2, 11)
    graph.addEdge(2, 12)
    graph.addEdge(3, 9)
    graph.addEdge(3, 10)
    graph.addEdge(3, 11)
    graph.addEdge(3, 12)
    graph.addEdge(4, 9)
    graph.addEdge(4, 10)
    graph.addEdge(4, 11)
    graph.addEdge(4, 12)
    graph.addEdge(5, 12)
    graph.addEdge(6, 12)

    assert.deepEqual(completeQB(graph, h1, h2, 1, 3), [
      {source: [1, 2, 3, 4], target: [10, 11, 12, 9]},
      {source: [2, 3, 4, 5], target: [10, 11, 12, 9]},
      {source: [2, 3, 4, 6], target: [10, 11, 12, 9]},
      {source: [1, 2, 3, 4, 5], target: [10, 11, 12]},
      {source: [1, 2, 3, 4, 6], target: [10, 11, 12]}
    ])
  })
})
