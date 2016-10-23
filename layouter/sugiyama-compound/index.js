const Graph = require('../../graph')
const accessor = require('../../utils/accessor')
const edgeFunction = require('../../utils/edge-function')
const vertexFunction = require('../../utils/vertex-function')
const derivedGraph = require('./derived-graph')
const acyclicDerivedGraph = require('./acyclic-derived-graph')
const {CompoundLayering} = require('./layering')
const {CompoundOrdering} = require('./ordering')
const removeCycle = require('./remvoe-cycle')
const normalize = require('./normalize')
const layout = require('./position-assignment')

const initialize = (graphIn, options) => {
  const {
    vertexMargin,
    layerMargin,
    edgeMargin,
    vertexWidth,
    vertexHeight,
    edgeWidth
  } = options
  const graph = new Graph()
  for (const u of graphIn.vertices()) {
    const d = graphIn.vertex(u)
    const width = vertexWidth(u)
    const height = vertexHeight(u)
    graph.addVertex(u, Object.assign({}, d, {
      width: width + vertexMargin,
      height: height + layerMargin,
      origWidth: width,
      origHeight: height
    }))
  }
  for (const [u, v] of graphIn.edges()) {
    const d = graphIn.edge(u, v)
    const width = edgeWidth(u, v)
    graph.addEdge(u, v, Object.assign({}, d, {
      width: width + edgeMargin,
      origWidth: width
    }))
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
        vertexMargin: 10,
        layerMargin: 10,
        edgeMargin: 10,
        parentHorizontalMargin: 10,
        parentVerticalMargin: 10,
        vertexWidth: ({d}) => d.width,
        vertexHeight: ({d}) => d.height,
        edgeWidth: () => 1,
        layering: new CompoundLayering(),
        ordering: new CompoundOrdering()
      })
    }

    layout (graphIn) {
      const graph = initialize(graphIn, {
        vertexMargin: this.vertexMargin(),
        layerMargin: this.layerMargin(),
        edgeMargin: this.edgeMargin(),
        vertexWidth: vertexFunction(this.vertexWidth(), graphIn),
        vertexHeight: vertexFunction(this.vertexHeight(), graphIn),
        edgeWidth: edgeFunction(this.edgeWidth(), graphIn)
      })
      const derived = derivedGraph(graph)
      acyclicDerivedGraph(derived)
      this.layering().call(derived)
      removeCycle(graph)
      normalize(graph)
      this.ordering().call(graph)
      layout(graph, this.parentHorizontalMargin(), this.parentVerticalMargin())
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
          const width = graph.edge(u, w).origWidth
          if (graphIn.edge(u, v)) {
            edges[u][v] = {
              points,
              width,
              reversed: false
            }
          } else {
            edges[v][u] = {
              points,
              width,
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

    edgeMargin () {
      return accessor(this, privates, 'edgeMargin', arguments)
    }

    parentHorizontalMargin () {
      return accessor(this, privates, 'parentHorizontalMargin', arguments)
    }

    parentVerticalMargin () {
      return accessor(this, privates, 'parentVerticalMargin', arguments)
    }

    vertexWidth () {
      return accessor(this, privates, 'vertexWidth', arguments)
    }

    vertexHeight () {
      return accessor(this, privates, 'vertexHeight', arguments)
    }

    edgeWidth () {
      return accessor(this, privates, 'edgeWidth', arguments)
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
