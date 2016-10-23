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

const tail = (layer) => {
  return layer[layer.length - 1]
}

const normalize = (graph) => {
  for (const [u, v] of graph.edges()) {
    const {width, origWidth} = graph.edge(u, v)
    const uLayer = graph.vertex(u).layer
    const vLayer = graph.vertex(v).layer
    if (uLayer.length !== vLayer.length) {
      const uNeighbor = Symbol()
      const vNeighbor = Symbol()
      graph
        .addVertex(uNeighbor, {
          layer: next(uLayer),
          width,
          origWidth,
          height: 0,
          dummy: true
        })
        .addVertex(vNeighbor, {
          layer: prev(vLayer),
          width,
          origWidth,
          height: 0,
          dummy: true
        })
        .addEdge(u, uNeighbor, {
          width,
          origWidth
        })
        .addEdge(vNeighbor, v, {
          width,
          origWidth
        })
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
    } else if (tail(vLayer) - tail(uLayer) > 1) {
      const parent = graph.parent(u)
      let w = u
      let wLayer = uLayer
      const diff = tail(vLayer) - tail(uLayer)
      for (let i = diff; i > 1; --i) {
        const neighbor = Symbol()
        wLayer = next(wLayer)
        graph
          .addVertex(neighbor, {
            layer: wLayer,
            width: 10,
            height: 0,
            dummy: true
          })
          .setChild(parent, neighbor)
          .addEdge(w, neighbor, {
            width,
            origWidth
          })
        w = neighbor
      }
      graph
        .addEdge(w, v, {
          width,
          origWidth
        })
        .removeEdge(u, v)
    }
  }
  for (const u of graph.vertices()) {
    const uLayer = graph.vertex(u).layer
    const x = tail(uLayer)
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
