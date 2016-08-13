const next = (layer) => {
  const result = Array.from(layer)
  result[result.length - 1] += 1
  return result
}

const prev = (layer) => {
  const result = Array.from(layer)
  result[result.length - 1] -= 1
  return result
}

const normalize = (graph, layers) => {
  for (const [u, v] of graph.edges()) {
    const uLayer = layers.get(u)
    const vLayer = layers.get(v)
    if (uLayer.length !== vLayer.length) {
      const uNeighbor = Symbol()
      const vNeighbor = Symbol()
      graph
        .addVertex(uNeighbor)
        .addVertex(vNeighbor)
        .addEdge(u, uNeighbor)
        .addEdge(vNeighbor, v)
      layers.set(uNeighbor, next(uLayer))
      layers.set(vNeighbor, prev(vLayer))
      if (uLayer.length < vLayer.length) {
        const root = graph.parent(u)
        graph.setChild(root, uNeighbor)
        graph.setChild(uNeighbor, vNeighbor)
      } else {
        const root = graph.parent(u)
        graph.setChild(root, uNeighbor)
        graph.setChild(uNeighbor, vNeighbor)
      }
      graph.removeEdge(u, v)
    }
  }
}

module.exports = normalize
