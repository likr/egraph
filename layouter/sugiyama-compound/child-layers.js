const childLayer = (graph, v) => {
  const depth = graph.vertex(v).layer.length
  const ws = graph.children(v)
  const h = Math.max(...ws.map((w) => graph.vertex(w).layer[depth])) + 1
  const layers = []
  for (let i = 0; i < h; ++i) {
    layers.push([])
  }
  for (const w of ws) {
    layers[graph.vertex(w).layer[depth]].push(w)
  }
  return layers
}

module.exports = childLayer
