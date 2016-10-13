const upperLayer = (graph, S) => {
  const setS = new Set(S)
  return S.map((u) => ({
    neighbors: new Set(graph.outVertices(u).filter((v) => !setS.has(v)))
  }))
}

const lowerLayer = (graph, T) => {
  const setT = new Set(T)
  return T.map((v) => ({
    neighbors: new Set(graph.inVertices(v).filter((u) => !setT.has(u)))
  }))
}

const upperLayerWithDummy = (graph, T) => {
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
      } else {
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

const lowerLayerWithDummy = (graph, S) => {
  const order = new Map(S.map((u, i) => [u, i]))
  const lowerVertices = new Map()
  for (const u of S) {
    for (const v of graph.outVertices(u)) {
      if (!order.has(v)) {
        if (!lowerVertices.has(v)) {
          lowerVertices.set(v, {neighbors: new Set([u])})
        } else {
          lowerVertices.get(v).neighbors.add(u)
        }
      } else {
        lowerVertices.set(Symbol(), {neighbors: new Set([u, v])})
      }
    }
  }
  for (const [key, {neighbors}] of lowerVertices) {
    let sum = 0
    for (const u of neighbors) {
      sum += order.get(u)
    }
    lowerVertices.get(key).weight = sum / neighbors.size
  }
  const result = Array.from(lowerVertices.values())
  result.sort((a, b) => a.weight - b.weight)
  return result
}

const bou = (graph, S, T) => {
  const weight = new Map(T.map((u) => [u, 0]))
  const count = new Map(T.map((u) => [u, 0]))
  for (let i = 0; i < S.length; ++i) {
    for (const v of S[i].neighbors) {
      weight.set(v, weight.get(v) + i)
      count.set(v, count.get(v) + 1)
    }
  }
  for (const u of T) {
    weight.set(u, weight.get(u) / count.get(u) || 0)
  }
  T.sort((u1, u2) => weight.get(u1) - weight.get(u2))
}

const orderLayers = (graph, vertexLayer, repeat, v) => {
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

  for (let j = 0; j < repeat; ++j) {
    bou(graph, upperLayerWithDummy(graph, layers[0]), layers[0])
    for (let i = 1; i < h; ++i) {
      bou(graph, upperLayer(graph, layers[i - 1]), layers[i])
      bou(graph, upperLayerWithDummy(graph, layers[i]), layers[i])
    }
    bou(graph, lowerLayerWithDummy(graph, layers[1]), layers[1])
    for (let i = h - 2; i >= 0; --i) {
      bou(graph, lowerLayer(graph, layers[i + 1]), layers[i])
      bou(graph, lowerLayerWithDummy(graph, layers[i]), layers[i])
    }
  }

  return layers
}

module.exports = orderLayers
