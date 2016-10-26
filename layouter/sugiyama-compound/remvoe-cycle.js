const compareClev = require('./compare-clev')

const removeCycle = (graph) => {
  const reverseEdges = []
  for (const [u, v] of graph.edges()) {
    if (compareClev(graph.vertex(u).layer, graph.vertex(v).layer) > 0) {
      reverseEdges.push([u, v])
    }
  }
  for (const [u, v] of reverseEdges) {
    const d = graph.edge(u, v)
    graph.removeEdge(u, v)
    graph.addEdge(v, u, Object.assign({}, d, {reversed: true}))
  }
}

module.exports = removeCycle
