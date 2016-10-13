/* eslint-env mocha */
const Graph = require('../../../graph')
const orderLayers = require('../../../layouter/sugiyama-compound/crossing-reduction')

describe('orderLayers', () => {
  it('', () => {
    const [a, b, c, g, h, i, j, k, v] = 'abcghijkv'
    const graph = new Graph()
      .addVertex(a)
      .addVertex(b)
      .addVertex(c)
      .addVertex(g)
      .addVertex(h)
      .addVertex(i)
      .addVertex(j)
      .addVertex(k)
      .addVertex(v)
      .addEdge(a, c)
      .addEdge(a, i)
      .addEdge(b, c)
      .addEdge(b, j)
      .addEdge(b, k)
      .addEdge(c, g)
      .addEdge(g, i)
      .addEdge(g, j)
      .addEdge(g, k)
      .addEdge(h, k)
      .setChild(v, a)
      .setChild(v, b)
      .setChild(v, c)
      .setChild(v, g)
      .setChild(v, h)
      .setChild(v, i)
      .setChild(v, j)
      .setChild(v, k)
    const layers = new Map([
      [a, [0, 0]],
      [b, [0, 0]],
      [c, [0, 0]],
      [g, [0, 1]],
      [h, [0, 1]],
      [i, [0, 1]],
      [j, [0, 1]],
      [k, [0, 1]],
      [v, [0]]
    ])
    const ordering = orderLayers(graph, layers, 1)
    console.log(ordering)
  })
})
