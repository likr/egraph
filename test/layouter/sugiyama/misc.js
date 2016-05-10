/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../graph')
const median = require('../../../layouter/sugiyama/misc/median')

describe('median(g, v)', () => {
  it('returns left median and right median of in vertices, which has even length, of v ', () => {
    const [a, b, c, d, e] = [0, 1, 2, 3, 4]
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e)
      .addEdge(a, e)
      .addEdge(b, e)
      .addEdge(c, e)
      .addEdge(d, e)
    assert.deepEqual(median(graph, e), {
      left: b,
      right: c
    })
  })

  it('returns left median and right median of in vertices, which has odd length, of v', () => {
    const [a, b, c, d, e, f] = [0, 1, 2, 3, 4, 5]
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e, {order: 4})
      .addVertex(f)
      .addEdge(a, f)
      .addEdge(b, f)
      .addEdge(c, f)
      .addEdge(d, f)
      .addEdge(e, f)
    assert.deepEqual(median(graph, f), {
      left: c,
      right: c
    })
  })
})

describe('median(g, v, true)', () => {
  it('returns left median and right median of out vertices, which has even length, of v', () => {
    const [a, b, c, d, e] = [0, 1, 2, 3, 4]
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e)
      .addEdge(e, a)
      .addEdge(e, b)
      .addEdge(e, c)
      .addEdge(e, d)
    assert.deepEqual(median(graph, e, true), {
      left: b,
      right: c
    })
  })

  it('returns left median and right median of out vertices, which has odd length, of v', () => {
    const [a, b, c, d, e, f] = [0, 1, 2, 3, 4, 5]
    const graph = new Graph()
      .addVertex(a, {order: 0})
      .addVertex(b, {order: 1})
      .addVertex(c, {order: 2})
      .addVertex(d, {order: 3})
      .addVertex(e, {order: 4})
      .addVertex(f)
      .addEdge(f, a)
      .addEdge(f, b)
      .addEdge(f, c)
      .addEdge(f, d)
      .addEdge(f, e)
    assert.deepEqual(median(graph, f, true), {
      left: c,
      right: c
    })
  })
})
