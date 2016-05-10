const Graph = require('./mutable-graph')

const copy = (g) => {
  const newGraph = new Graph()
  for (const u of g.vertices()) {
    newGraph.addVertex(u, g.vertex(u))
  }
  for (const [u, v] of g.edges()) {
    newGraph.addEdge(u, v, g.edge(u, v))
  }
  return newGraph
}

module.exports = copy
