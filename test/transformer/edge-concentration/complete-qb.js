/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const completeQB = require('../../../transformer/edge-concentration/complete-qb')

const testEpsilonQuasiBiclique = (graph, source, target, epsilon, ms) => {
  assert(source.length >= ms)
  assert(target.length >= ms)
  for (const u of source) {
    const vertices = new Set(graph.outVertices(u))
    let count = 0
    for (const v of target) {
      if (!vertices.has(v)) {
        count += 1
      }
    }
    assert(count <= epsilon)
  }
  for (const u of target) {
    const vertices = new Set(graph.inVertices(u))
    let count = 0
    for (const v of source) {
      if (!vertices.has(v)) {
        count += 1
      }
    }
    assert(count <= epsilon)
  }
}

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

    const result = completeQB(graph, h1, h2, 1, 3)
    for (const {source, target} of result) {
      testEpsilonQuasiBiclique(graph, source, target, 1, 3)
    }
    assert.deepEqual(result, [
      {source: [1, 2, 3, 4], target: [10, 11, 12, 9]}
    ])
  })

  it('return maximal epsilon-quasi-bicliques', () => {
    const h1 = [0, 1, 2, 3]
    const h2 = [4, 5, 6, 7]
    const graph = new Graph()
    for (const u of h1) {
      graph.addVertex(u)
    }
    for (const u of h2) {
      graph.addVertex(u)
    }
    graph.addEdge(0, 4)
    graph.addEdge(1, 5)
    graph.addEdge(1, 6)
    graph.addEdge(1, 7)
    graph.addEdge(2, 5)
    graph.addEdge(2, 6)
    graph.addEdge(2, 7)
    graph.addEdge(3, 5)
    graph.addEdge(3, 6)
    graph.addEdge(3, 7)

    const result = completeQB(graph, h1, h2, 1, 3)
    for (const {source, target} of result) {
      testEpsilonQuasiBiclique(graph, source, target, 1, 3)
    }
    assert.deepEqual(result, [
      {source: [1, 2, 3], target: [5, 6, 7]}
    ])
  })
})
