/* eslint-env mocha */

const Graph = require('../../../graph')
const CompoundSugiyamaLayouter = require('../../../layouter/sugiyama-compound')

describe('CompoundSugiyamaLayouter', () => {
  it('works', () => {
    const [a, b, c, d, e, f, g, h, i, j, k, l, m, n] = 'abcdefghijklmn'
    const graph = new Graph()
      .addVertex(a, {width: 10, height: 10})
      .addVertex(b, {width: 10, height: 10})
      .addVertex(c, {width: 10, height: 10})
      .addVertex(d, {width: 10, height: 10})
      .addVertex(e, {width: 10, height: 10})
      .addVertex(f, {width: 10, height: 10})
      .addVertex(g, {width: 10, height: 10})
      .addVertex(h, {width: 10, height: 10})
      .addVertex(i, {width: 10, height: 10})
      .addVertex(j, {width: 10, height: 10})
      .addVertex(k, {width: 10, height: 10})
      .addVertex(l, {width: 10, height: 10})
      .addVertex(m, {width: 10, height: 10})
      .addVertex(n, {width: 10, height: 10})
      .addEdge(b, c)
      .addEdge(d, e)
      .addEdge(g, b)
      .addEdge(h, m)
      .addEdge(i, n)
      .addEdge(j, l)
      .addEdge(k, l)
      .addEdge(m, i)
      .addEdge(m, n)
      .setChild(a, b)
      .setChild(a, c)
      .setChild(b, d)
      .setChild(b, e)
      .setChild(b, f)
      .setChild(e, j)
      .setChild(f, k)
      .setChild(f, l)
      .setChild(c, g)
      .setChild(c, h)
      .setChild(c, i)
      .setChild(g, m)
      .setChild(g, n)
    const layouter = new CompoundSugiyamaLayouter()
    layouter.layout(graph)
  })
})
