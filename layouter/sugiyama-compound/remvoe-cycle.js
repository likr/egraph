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

const removeCycle = (graph) => {
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
}

module.exports = removeCycle
