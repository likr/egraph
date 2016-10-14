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
          width: 0,
          height: 0,
          dummy: true
        })
        .addVertex(vNeighbor, {
          layer: prev(vLayer),
          width: 0,
          height: 0,
          dummy: true
        })
        .addEdge(u, uNeighbor)
        .addEdge(vNeighbor, v)
      if (uLayer.length < vLayer.length) {
        const root = graph.parent(u)
        graph.setChild(root, uNeighbor)
        graph.setChild(uNeighbor, vNeighbor)
      } else {
        const root = graph.parent(v)
        graph.setChild(root, vNeighbor)
        graph.setChild(vNeighbor, uNeighbor)
      }
      graph.removeEdge(u, v)
    }
  }
  for (const u of graph.vertices()) {
    const uLayer = graph.vertex(u).layer
    const x = uLayer[uLayer.length - 1]
    if (x < 0) {
      for (const v of graph.vertices()) {
        const vLayer = graph.vertex(v).layer
        if (uLayer.length !== vLayer.length) {
          continue
        }
        let flag = true
        for (let i = 0; i < uLayer.length - 1; ++i) {
          if (uLayer[i] !== vLayer[i]) {
            flag = false
            break
          }
        }
        if (flag) {
          vLayer[uLayer.length - 1] -= x
        }
      }
    }
  }
}

module.exports = normalize
