/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../../../../graph')
const QuadHeuristic = require('../../../../layouter/sugiyama/layer-assignment/quad-heuristic')

describe('QuadHeuristic', () => {
  describe('call(graph)', () => {
    it('returns layers', () => {
      const [a, b, c, d, e, f, g, h] = [0, 1, 2, 3, 4, 5, 6, 7]
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addVertex(c)
        .addVertex(d)
        .addVertex(e)
        .addVertex(f)
        .addVertex(g)
        .addVertex(h)
        .addEdge(a, b)
        .addEdge(b, c)
        .addEdge(c, d)
        .addEdge(d, e)
        .addEdge(f, g)
        .addEdge(g, h)
      assert.deepEqual(new QuadHeuristic().call(graph), {
        [a]: 0,
        [b]: 1,
        [c]: 2,
        [d]: 3,
        [e]: 4,
        [f]: 0,
        [g]: 2,
        [h]: 4
      })
    })
  })

  describe('repeat()', () => {
    it('returns current repeat number', () => {
      const qh = new QuadHeuristic()
      assert(qh.repeat())
    })
  })

  describe('repeat(val)', () => {
    it('sets repeat number and returns self', () => {
      const qh = new QuadHeuristic()
      assert.equal(qh.repeat(8), qh)
      assert.equal(qh.repeat(), 8)
    })
  })
})
