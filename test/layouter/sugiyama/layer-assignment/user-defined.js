/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const UserDefined = require('../../../../layouter/sugiyama/layer-assignment/user-defined')

describe('UserDefined', () => {
  describe('call(graph)', () => {
    it('returns layers', () => {
      const [a, b, c, d, e] = [0, 1, 2, 3, 4]
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addVertex(c)
        .addVertex(d)
        .addVertex(e)
        .addEdge(a, b)
        .addEdge(b, c)
        .addEdge(d, c)
        .addEdge(d, e)
      const layers = {
        [a]: 0,
        [b]: 1,
        [c]: 2,
        [d]: 1,
        [e]: 2
      }
      const layerAssignment = new UserDefined().f((u) => layers[u])
      assert.deepEqual(layerAssignment.call(graph), layers)
    })
  })
})
