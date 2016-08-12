const replace = (graph, cycleEdges) => {
  for (const [u, v] of cycleEdges) {
    const obj = graph.edge(u, v)
    graph.removeEdge(u, v)
    if (u === v) {
      continue
    }
    const edge = graph.edge(v, u)
    if (edge) {
      edge.multiple = true
    } else {
      graph.addEdge(v, u, Object.assign({reversed: true}, obj))
    }
  }
}

module.exports = replace
