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

const normalize = (graph) => {
  for (const [u, v] of graph.edges()) {
    const uLayer = graph.vertex(u).layer
    const vLayer = graph.vertex(v).layer
    if (uLayer.length !== vLayer.length) {
      const uNeighbor = Symbol()
      const vNeighbor = Symbol()
      graph
        .addVertex(uNeighbor, {
          layer: next(uLayer),
          width: 0
        })
        .addVertex(vNeighbor, {
          layer: prev(vLayer),
          width: 0
        })
        .addEdge(u, uNeighbor)
        .addEdge(vNeighbor, v)
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
