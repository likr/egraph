const Graph = require('../../graph')
const derivedGraph = require('./derived-graph')
const acyclicDerivedGraph = require('./acyclic-derived-graph')
const layerAssignment = require('./layer-assignment')
const normalize = require('./normalize')
const orderLayers = require('./crossing-reduction')
const layout = require('./position-assignment')

const initialize = (graphIn) => {
  const vertexMargin = 10
  const layerMargin = 10
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

const cmpClev = (layer1, layer2) => {
  const minLen = Math.min(layer1.length, layer2.length)
  for (let i = 0; i < minLen; ++i) {
    if (layer1[i] < layer2[i]) {
      return -1
    } else if (layer1[i] > layer2[i]) {
      return 1
    }
  }
  if (layer1.length < layer2.length) {
    return -1
  } else if (layer1.length > layer2.length) {
    return 1
  }
  return 0
}

const CompoundSugiyamaLayouter = (() => {
  const privates = new WeakMap()

  return class CompoundSugiyamaLayouter {
    constructor () {
      privates.set(this, {
      })
    }

    layout (graphIn) {
      const graph = initialize(graphIn)
      const derived = derivedGraph(graph)
      acyclicDerivedGraph(derived)
      layerAssignment(derived)
      const reverseEdges = []
      for (const [u, v] of graph.edges()) {
        if (cmpClev(graph.vertex(u).layer, graph.vertex(v).layer) > 0) {
          reverseEdges.push([u, v])
        }
      }
      for (const [u, v] of reverseEdges) {
        const d = graph.edge(u, v)
        graph.removeEdge(u, v)
        graph.addEdge(v, u, {reversed: true, d})
      }
      normalize(graph)
      orderLayers(graph, 1)
      layout(graph)
      const vertices = {}
      for (const u of graphIn.vertices()) {
        const d = graph.vertex(u)
        vertices[u] = Object.assign(d, {
          width: d.origWidth || d.width,
          height: d.origHeight || d.height
        })
      }
      return {vertices}
    }
  }
})()

module.exports = CompoundSugiyamaLayouter
