const Graph = require('../../graph')

const longestPath = (graph) => {
  const visited = {}
  const layers = {}

  const dfs = (u) => {
    if (visited[u]) {
      return layers[u]
    }
    visited[u] = true

    let layer = -Infinity
    for (const v of graph.inVertices(u)) {
      layer = Math.max(layer, graph.edge(v, u).priority === -2 ? dfs(v) : dfs(v) + 1)
    }
    if (layer === -Infinity) {
      layer = 0
    }
    layers[u] = layer
    return layer
  }

  for (const u of graph.vertices()) {
    if (graph.outDegree(u) === 0) {
      dfs(u)
    }
  }

  return layers
}

const layerAssignment = (graph) => {
  let children = new Set(graph.vertices().filter((u) => graph.parent(u) === null))
  while (children.size) {
    const subGraph = new Graph()
    for (const u of children) {
      subGraph.addVertex(u)
    }
    for (const [u, v] of graph.edges()) {
      if (subGraph.vertex(u) && subGraph.vertex(v)) {
        subGraph.addEdge(u, v, graph.edge(u, v))
      }
    }
    const layers = longestPath(subGraph)
    for (const u of subGraph.vertices()) {
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
