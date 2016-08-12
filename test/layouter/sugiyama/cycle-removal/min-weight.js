/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const MinWeight = require('../../../../layouter/sugiyama/cycle-removal/min-weight')

describe('MinWeight', () => {
  describe('call(graph)', () => {
    it('reverse cycle edges with minimum weight', () => {
      const [a, b, c] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addVertex(c)
        .addEdge(a, b, {weight: 1})
        .addEdge(b, c, {weight: 2})
        .addEdge(c, a, {weight: 3})
      const cycleRemoval = new MinWeight()
        .weight(({d}) => d.weight)
      cycleRemoval.call(graph)
      assert(graph.edge(b, a))
    })
  })
})
