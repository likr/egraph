const priorityLayer = require('../sugiyama/position-assignment/priority')

const priority = (graph) => {
}

const layoutLocal = (graph) => {
}

const layoutGlobal = (graph) => {
}

const metricalLayout = (graph) => {
  const result = new Map()
  for (const u of graph.vertices()) {
    if (graph.parent(u) == null) {
      layoutLocal(graph, u)
      const vertex = graph.vertex(u)
      vertex.X = vertex.width / 2
      layoutGlobal(graph, u)
    }
  }
  return result
}

module.exports = metricalLayout
