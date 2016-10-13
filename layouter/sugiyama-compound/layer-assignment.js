const Graph = require('../../graph')
const LongestPath = require('../sugiyama/layer-assignment/longest-path')

const layerAssignment = (graph) => {
  const longestPath = new LongestPath()
  let children = new Set(graph.vertices().filter((u) => graph.parent(u) === null))
  while (children.size) {
    const subGraph = new Graph()
    for (const u of children) {
      subGraph.addVertex(u)
    }
    for (const [u, v] of graph.edges()) {
      if (subGraph.vertex(u) && subGraph.vertex(v)) {
        subGraph.addEdge(u, v)
      }
    }
    const layers = longestPath.call(subGraph)
    for (const u of subGraph.vertices()) {
      if (graph.parent(u)) {
      }
      const parentLayer = graph.parent(u) === null
        ? []
        : Array.from(graph.vertex(graph.parent(u)).layer)
      parentLayer.push(layers[u])
      graph.vertex(u).layer = parentLayer
    }

    const parents = children
    children = new Set()
    for (const u of parents) {
      for (const v of graph.children(u)) {
        children.add(v)
      }
    }
  }
}

module.exports = layerAssignment
