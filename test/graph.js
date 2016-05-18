/* eslint-env mocha */
const assert = require('power-assert')
const Graph = require('../graph/mutable-graph')
const copy = require('../graph/copy')

describe('Graph', () => {
  describe('constructor', () => {
    var graph

    beforeEach(() => {
      graph = new Graph()
    })

    it('should return graph that have no vertex', () => {
      assert.equal(graph.numVertices(), 0)
    })

    it('should return graph that have no edge', () => {
      assert.equal(graph.numEdges(), 0)
    })
  })

  describe('addVertex(u, d)', () => {
    const u = 0
    const d = {}
    var graph, graph2

    beforeEach(() => {
      graph = new Graph()
      graph2 = graph.addVertex(u, d)
    })

    it('should return self', () => {
      assert.equal(graph, graph2)
    })

    it('should increase numVertices', () => {
      assert.equal(graph2.numVertices(), 1)
    })

    it('should set d', () => {
      assert.equal(graph2.vertex(u), d)
    })

    it('should throw Error when u is duplicated', () => {
      assert.throws(() => {
        graph2.addVertex(u, d)
      })
    })
  })

  describe('addEdge(u, v, d)', () => {
    const u = 0
    const v = 1
    const d = {}
    var graph, graph2

    beforeEach(() => {
      graph = new Graph()
      graph2 = graph
        .addVertex(u)
        .addVertex(v)
        .addEdge(u, v, d)
    })

    it('should return self', () => {
      assert.equal(graph, graph2)
    })

    it('should increase numEdges', () => {
      assert.equal(graph2.numEdges(), 1)
    })

    it('should set d', () => {
      assert.equal(graph2.edge(u, v), d)
    })

    it('should throw Error when (u, v) is duplicated', () => {
      assert.throws(() => {
        graph2.addEdge(u, v, d)
      })
    })
  })

  describe('removeVertex(u)', () => {
    const u = 0
    const v = 1
    var graph, graph2

    beforeEach(() => {
      graph = new Graph()
      graph2 = graph
        .addVertex(u)
        .addVertex(v)
        .addEdge(u, v)
        .removeVertex(u)
    })

    it('should return self', () => {
      assert.equal(graph, graph2)
    })

    it('should remove the vertex', () => {
      assert.equal(graph2.vertex(u), null)
    })

    it('should decrease numVertices', () => {
      assert.equal(graph2.numVertices(), 1)
    })

    it('should clear in/out edges', () => {
      assert.equal(graph2.numEdges(), 0)
    })

    it('should throw Error when u is empty', () => {
      assert.throws(() => {
        graph2.removeVertex(u)
      })
    })
  })

  describe('removeEdge(u, v)', () => {
    const u = 0
    const v = 1
    var graph, graph2

    beforeEach(() => {
      graph = new Graph()
      graph2 = graph
        .addVertex(u)
        .addVertex(v)
        .addEdge(u, v)
        .removeEdge(u, v)
    })

    it('should return self', () => {
      assert.equal(graph, graph2)
    })

    it('should remove the edge', () => {
      assert.equal(graph2.edge(u, v), null)
    })

    it('should decrease numEdges', () => {
      assert.equal(graph2.numEdges(), 0)
    })

    it('should throw Error when (u, v) is empty', () => {
      assert.throws(() => {
        graph2.removeEdge(u, v)
      })
    })
  })

  describe('numVertices()', () => {
    it('returns number of vertices', () => {
      const graph = new Graph()
        .addVertex(0)
        .addVertex(1)
        .addVertex(2)
      assert.equal(graph.numVertices(), 3)
    })
  })

  describe('numEdges()', () => {
    const u = 0
    const v = 1
    const w = 2
    it('returns number of edges', () => {
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      assert.equal(graph.numEdges(), 3)
    })
  })

  describe('vertices()', () => {
    it('returns generator of vertex descriptors', () => {
      const graph = new Graph()
      const objs = {
        0: {spam: 'spam'},
        1: {ham: 'ham'},
        2: {egg: 'egg'}
      }
      for (let i = 0; i < objs.length; ++i) {
        graph.addVertex(i, objs[i])
      }
      let count = 0
      for (const u of graph.vertices()) {
        assert.equal(graph.vertex(u), objs[u])
        count++
      }
      assert.equal(count, graph.numVertices())
    })
  })

  describe('edges()', () => {
    it('returns generator of edge descriptors', () => {
      const [u, v, w] = [0, 1, 2]
      const objs = {
        [u]: {
          [v]: {spam: 'spam'},
          [w]: {ham: 'ham'}
        },
        [v]: {
          [w]: {egg: 'egg'}
        }
      }
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v, objs[u][v])
        .addEdge(u, w, objs[u][w])
        .addEdge(v, w, objs[v][w])
      let count = 0
      for (const [u, v] of graph.edges()) {
        assert.equal(graph.edge(u, v), objs[u][v])
        count++
      }
      assert.equal(count, graph.numEdges())
    })
  })

  describe('outVertices(u)', () => {
    it('returns generator of out vertices from u', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      const outVertices = new Set([v, w])
      let count = 0
      for (const v of graph.outVertices(u)) {
        assert.ok(outVertices.has(v))
        count++
      }
      assert.equal(count, graph.outDegree(u))
    })
  })

  describe('inVertices(u)', () => {
    it('returns generator of in vertices to u', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      const inVertices = new Set([u, v])
      let count = 0
      for (const v of graph.inVertices(w)) {
        assert.ok(inVertices.has(v))
        count++
      }
      assert.equal(count, graph.inDegree(w))
    })
  })

  describe('outEdges(u)', () => {
    it('returns generator of out edges from u', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      const outVertices = new Set([v, w])
      let count = 0
      for (const [v, w] of graph.outEdges(u)) {
        assert.equal(v, u)
        assert.ok(outVertices.has(w))
        count++
      }
      assert.equal(count, graph.outDegree(u))
    })
  })

  describe('inEdges(u)', () => {
    it('returns generator of in vertices to u', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      const inVertices = new Set([u, v])
      let count = 0
      for (const [u, v] of graph.inEdges(w)) {
        assert.equal(v, w)
        assert.ok(inVertices.has(u))
        count++
      }
      assert.equal(count, graph.inDegree(w))
    })
  })

  describe('toJSON()', () => {
    it('returns JSON representation of the graph', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      assert.deepEqual(graph.toJSON(), {
        'vertices': [
          {'u': 0, 'd': {}},
          {'u': 1, 'd': {}},
          {'u': 2, 'd': {}}
        ],
        'edges': [
          {'u': 0, 'v': 1, 'd': {}},
          {'u': 0, 'v': 2, 'd': {}},
          {'u': 1, 'v': 2, 'd': {}}
        ]
      })
    })
  })

  describe('toString()', () => {
    it('returns string representation of the graph', () => {
      const [u, v, w] = [0, 1, 2]
      const graph = new Graph()
        .addVertex(u)
        .addVertex(v)
        .addVertex(w)
        .addEdge(u, v)
        .addEdge(u, w)
        .addEdge(v, w)
      assert.equal(graph.toString(), '{"vertices":[{"u":0,"d":{}},{"u":1,"d":{}},{"u":2,"d":{}}],"edges":[{"u":0,"v":1,"d":{}},{"u":0,"v":2,"d":{}},{"u":1,"v":2,"d":{}}]}')
    })
  })
})

describe('copy', () => {
  it('returns copied graph', () => {
    const [u, v, w] = [0, 1, 2]
    const graph = new Graph()
      .addVertex(u)
      .addVertex(v)
      .addVertex(w)
      .addEdge(u, v)
      .addEdge(u, w)
      .addEdge(v, w)
    const newGraph = copy(graph)
    assert.equal(newGraph.numVertices(), graph.numVertices())
    assert.equal(newGraph.numEdges(), graph.numEdges())
  })
})
