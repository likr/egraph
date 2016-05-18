/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const bundleEdges = require('../../../layouter/sugiyama/bundle-edges')

describe('bundleEdges(graph, layers, false)', () => {
  it('modify positions', () => {
    const [u1, v1, v2, v3, v4, v5, d1, d2, d3, d4, d5, d6, d7, d8] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const graph = new Graph()
    graph.addVertex(u1, {origWidth: 1, y: 20})
    graph.addVertex(v1, {origWidth: 1, y: 0})
    graph.addVertex(v2, {origWidth: 1, y: 10})
    graph.addVertex(v3, {origWidth: 1, y: 20})
    graph.addVertex(v4, {origWidth: 1, y: 30})
    graph.addVertex(v5, {origWidth: 1, y: 40})
    graph.addVertex(d1, {origWidth: 1, dummy: true, u: u1, y: 0})
    graph.addVertex(d2, {origWidth: 1, dummy: true, u: u1, y: 10})
    graph.addVertex(d3, {origWidth: 1, dummy: true, u: u1, y: 20})
    graph.addVertex(d4, {origWidth: 1, dummy: true, u: u1, y: 30})
    graph.addVertex(d5, {origWidth: 1, dummy: true, u: u1, y: 40})
    graph.addVertex(d6, {origWidth: 1, dummy: true, u: u1, y: 20})
    graph.addVertex(d7, {origWidth: 1, dummy: true, u: u1, y: 30})
    graph.addVertex(d8, {origWidth: 1, dummy: true, u: u1, y: 40})
    const layers = [
      [u1],
      [d1, d2, d3, d4, d5],
      [v1, v2, d6, d7, d8],
      [v3, v4, v5]
    ]
    bundleEdges(graph, layers, false)
    assert.equal(graph.vertex(d1).y, 18)
    assert.equal(graph.vertex(d2).y, 19)
    assert.equal(graph.vertex(d3).y, 20)
    assert.equal(graph.vertex(d4).y, 21)
    assert.equal(graph.vertex(d5).y, 22)
    assert.equal(graph.vertex(d6).y, 29)
    assert.equal(graph.vertex(d7).y, 30)
    assert.equal(graph.vertex(d8).y, 31)
  })
})

describe('bundleEdges(graph, layers, true)', () => {
  it('modify positions', () => {
    const [u1, v1, v2, v3, v4, v5, d1, d2, d3, d4, d5, d6, d7, d8] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const graph = new Graph()
    graph.addVertex(u1, {origWidth: 1, x: 20})
    graph.addVertex(v1, {origWidth: 1, x: 0})
    graph.addVertex(v2, {origWidth: 1, x: 10})
    graph.addVertex(v3, {origWidth: 1, x: 20})
    graph.addVertex(v4, {origWidth: 1, x: 30})
    graph.addVertex(v5, {origWidth: 1, x: 40})
    graph.addVertex(d1, {origWidth: 1, dummy: true, u: u1, x: 0})
    graph.addVertex(d2, {origWidth: 1, dummy: true, u: u1, x: 10})
    graph.addVertex(d3, {origWidth: 1, dummy: true, u: u1, x: 20})
    graph.addVertex(d4, {origWidth: 1, dummy: true, u: u1, x: 30})
    graph.addVertex(d5, {origWidth: 1, dummy: true, u: u1, x: 40})
    graph.addVertex(d6, {origWidth: 1, dummy: true, u: u1, x: 20})
    graph.addVertex(d7, {origWidth: 1, dummy: true, u: u1, x: 30})
    graph.addVertex(d8, {origWidth: 1, dummy: true, u: u1, x: 40})
    const layers = [
      [u1],
      [d1, d2, d3, d4, d5],
      [v1, v2, d6, d7, d8],
      [v3, v4, v5]
    ]
    bundleEdges(graph, layers, true)
    assert.equal(graph.vertex(d1).x, 18)
    assert.equal(graph.vertex(d2).x, 19)
    assert.equal(graph.vertex(d3).x, 20)
    assert.equal(graph.vertex(d4).x, 21)
    assert.equal(graph.vertex(d5).x, 22)
    assert.equal(graph.vertex(d6).x, 29)
    assert.equal(graph.vertex(d7).x, 30)
    assert.equal(graph.vertex(d8).x, 31)
  })
})
