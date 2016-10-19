const Graph = require('../../graph')
const accessor = require('../../utils/accessor')
const derivedGraph = require('./derived-graph')
const acyclicDerivedGraph = require('./acyclic-derived-graph')
const {CompoundLayering} = require('./layering')
const {CompoundOrdering} = require('./ordering')
const removeCycle = require('./remvoe-cycle')
const normalize = require('./normalize')
const layout = require('./position-assignment')

const initialize = (graphIn, vertexMargin, layerMargin) => {
  const graph = new Graph()
  for (const u of graphIn.vertices()) {
    const d = graphIn.vertex(u)
    graph.addVertex(u, Object.assign({}, d, {
      width: d.width + vertexMargin,
      height: d.height + layerMargin,
      origWidth: d.width,
      origHeight: d.height
    }))
  }
  for (const [u, v] of graphIn.edges()) {
    const d = graphIn.edge(u, v)
    graph.addEdge(u, v, d)
  }
  for (const u of graphIn.vertices()) {
    if (graphIn.parent(u) != null) {
      graph.setChild(graphIn.parent(u), u)
    }
  }
  return graph
}

const dummyPath = (graph, u, w) => {
  if (!graph.vertex(w).dummy) {
    return [u, w]
  }
  const path = [u]
  let v = w
  while (graph.vertex(v).dummy && graph.outVertices(v).length > 0) {
    path.push(v)
    v = graph.outVertices(v)[0]
  }
  if (graph.vertex(v).dummy) {
    if (graph.children(v).length > 0) {
      while (graph.outVertices(v).length === 0) {
        path.push(v)
        v = graph.children(v)[0]
      }
    } else {
      while (graph.outVertices(v).length === 0) {
        path.push(v)
        v = graph.parent(v)
      }
    }
  }
  while (graph.vertex(v).dummy) {
    path.push(v)
    v = graph.outVertices(v)[0]
  }
  path.push(v)
  return path
}

const pathPoints = (graph, path) => {
  const points = []
  const du = graph.vertex(path[0])
  points.push([du.x, du.y + du.height / 2])
  for (let i = 1; i < path.length - 1; ++i) {
    const dw = graph.vertex(path[i])
    if (graph.parent(path[i - 1]) === path[i]) {
      points.push([dw.x, dw.y + dw.height / 2])
    } else if (graph.parent(path[i + 1]) === path[i]) {
      points.push([dw.x, dw.y - dw.height / 2])
    } else {
      points.push([dw.x, dw.y - dw.height / 2])
      points.push([dw.x, dw.y + dw.height / 2])
    }
  }
  const dv = graph.vertex(path[path.length - 1])
  points.push([dv.x, dv.y - dv.height / 2])
  return points
}

const CompoundSugiyamaLayouter = (() => {
  const privates = new WeakMap()

  return class CompoundSugiyamaLayouter {
    constructor () {
      privates.set(this, {
        vertexMargin: 30,
        layerMargin: 30,
        layering: new CompoundLayering(),
        ordering: new CompoundOrdering()
      })
    }

    layout (graphIn) {
      const graph = initialize(graphIn, this.vertexMargin(), this.layerMargin())
      const derived = derivedGraph(graph)
      acyclicDerivedGraph(derived)
      this.layering().call(derived)
      removeCycle(graph)
      normalize(graph)
      this.ordering().call(graph)
      layout(graph, this.vertexMargin() / 2, this.layerMargin() / 2)
      const vertices = {}
      const edges = {}
      for (const u of graphIn.vertices()) {
        const d = graph.vertex(u)
        vertices[u] = Object.assign(d, {
          width: d.origWidth || d.width,
          height: d.origHeight || d.height
        })
        edges[u] = {}
      }
      for (const [u, w] of graph.edges()) {
        if (!graph.vertex(u).dummy) {
          const path = dummyPath(graph, u, w)
          const v = path[path.length - 1]
          const points = pathPoints(graph, path)
          if (graphIn.edge(u, v)) {
            edges[u][v] = {
              points,
              reversed: false
            }
          } else {
            edges[v][u] = {
              points,
              reversed: true
            }
          }
        }
      }
      return {vertices, edges}
    }

    layerMargin () {
      return accessor(this, privates, 'layerMargin', arguments)
    }

    vertexMargin () {
      return accessor(this, privates, 'vertexMargin', arguments)
    }

    layering () {
      return accessor(this, privates, 'layering', arguments)
    }

    ordering () {
      return accessor(this, privates, 'ordering', arguments)
    }
  }
})()

module.exports = CompoundSugiyamaLayouter
