const Graph = require('../../graph')
const derivedGraph = require('./derived-graph')
const acyclicDerivedGraph = require('./acyclic-derived-graph')
const layerAssignment = require('./layer-assignment')
const normalize = require('./normalize')
const orderLayers = require('./crossing-reduction')
const layout = require('./position-assignment')

const initialize = (graphIn) => {
  const graph = new Graph()
  for (const u of graphIn.vertices()) {
    const d = graphIn.vertex(u)
    graph.addVertex(u, d)
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

const CompoundSugiyamaLayouter = (() => {
  const privates = new WeakMap()

  return class CompoundSugiyamaLayouter {
    constructor () {
      privates.set(this, {
      })
    }

    layout (graphIn) {
      const graph = derivedGraph(initialize(graphIn))
      acyclicDerivedGraph(graph)
      layerAssignment(graph)
      normalize(graph)
      orderLayers(graph, 1)
      layout(graph)
      const vertices = {}
      for (const u of graphIn.vertices()) {
        vertices[u] = graph.vertex(u)
      }
      return {vertices}
    }
  }
})()

module.exports = CompoundSugiyamaLayouter
