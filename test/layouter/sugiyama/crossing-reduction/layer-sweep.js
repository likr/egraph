/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const LayerSweep = require('../../../../layouter/sugiyama/crossing-reduction/layer-sweep')

describe('LayerSweep', () => {
  describe('call(g, layers)', () => {
    it('sorts layers to minimize number of crossing', () => {
      const [a1, a2, a3] = [0, 1, 2]
      const [b1, b2, b3] = [3, 4, 5]
      const [c1, c2, c3] = [6, 7, 8]
      const [d1, d2, d3] = [9, 10, 11]
      const graph = new Graph()
        .addVertex(a1)
        .addVertex(a2)
        .addVertex(a3)
        .addVertex(b1)
        .addVertex(b2)
        .addVertex(b3)
        .addVertex(c1)
        .addVertex(c2)
        .addVertex(c3)
        .addVertex(d1)
        .addVertex(d2)
        .addVertex(d3)
        .addEdge(a1, b2)
        .addEdge(a2, b1)
        .addEdge(a3, b1)
        .addEdge(b1, c1)
        .addEdge(b2, c1)
        .addEdge(b2, c2)
        .addEdge(b2, c3)
        .addEdge(b3, c2)
        .addEdge(c1, d3)
        .addEdge(c2, d1)
        .addEdge(c2, d2)
      const layers = [
        [a1, a2, a3],
        [b1, b2, b3],
        [c1, c2, c3],
        [d1, d2, d3]
      ]
      new LayerSweep().call(graph, layers)
      assert.deepEqual(layers, [
        [a1, a2, a3],
        [b2, b1, b3],
        [c3, c1, c2],
        [d3, d1, d2]
      ])
    })
  })

  describe('repeat()', () => {
    it('returns current repeat number', () => {
      const layerSweep = new LayerSweep()
      assert.ok(Number.isInteger(layerSweep.repeat()))
    })
  })

  describe('repeat(value)', () => {
    it('sets repeat value and returns self', () => {
      const layerSweep = new LayerSweep()
      assert.equal(layerSweep.repeat(100), layerSweep)
      assert.equal(layerSweep.repeat(), 100)
    })
  })

  describe('method()', () => {
    it('returns current method function', () => {
      const layerSweep = new LayerSweep()
      assert.ok(layerSweep.method())
    })
  })

  describe('method(value)', () => {
    it('sets method function and returns self', () => {
      const layerSweep = new LayerSweep()
      const f = () => {}
      assert.equal(layerSweep.method(f), layerSweep)
      assert.equal(layerSweep.method(), f)
    })
  })
})
