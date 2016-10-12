const upperLayer = (graph, T, includeDummy) => {
  const order = new Map(T.map((v, i) => [v, i]))
  const upperVertices = new Map()
  for (const v of T) {
    for (const u of graph.inVertices(v)) {
      if (!order.has(u)) {
        if (!upperVertices.has(u)) {
          upperVertices.set(u, {neighbors: new Set([v])})
        } else {
          upperVertices.get(u).neighbors.add(v)
        }
      } else if (includeDummy) {
        upperVertices.set(Symbol(), {neighbors: new Set([u, v])})
      }
    }
  }
  for (const [key, {neighbors}] of upperVertices) {
    let sum = 0
    for (const v of neighbors) {
      sum += order.get(v)
    }
    upperVertices.get(key).weight = sum / neighbors.size
  }
  const result = Array.from(upperVertices.values())
  result.sort((a, b) => a.weight - b.weight)
  return result
}

const bou = (graph, T, includeDummy) => {
  const upperVertices = upperLayer(graph, T, includeDummy)
  const weight = new Map(T.map((u) => [u, 0]))
  const count = new Map(T.map((u) => [u, 0]))
  for (let i = 0; i < upperVertices.length; ++i) {
    for (const v of upperVertices[i].neighbors) {
      weight.set(v, weight.get(v) + i)
      count.set(v, count.get(v) + 1)
    }
  }
  for (const u of T) {
    weight.set(u, weight.get(u) / count.get(u))
  }
  T.sort((u1, u2) => weight.get(u1) - weight.get(u2))
}

const orderLayers = (graph, vertexLayer, v) => {
  const depth = vertexLayer.get(v).length
  const ws = graph.children(v)
  const h = Math.max(...ws.map((w) => vertexLayer.get(w)[depth])) + 1
  const layers = []
  for (let i = 0; i < h; ++i) {
    layers.push([])
  }
  for (const w of ws) {
    layers[vertexLayer.get(w)[depth]].push(w)
  }
  bou(graph, layers[0], true)

  return layers
}

module.exports = orderLayers
