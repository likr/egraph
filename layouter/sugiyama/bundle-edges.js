const segment = function * (graph, vertices, upper) {
  if (vertices.length === 0) {
    return
  }
  let seq = []
  let lastParent = graph.vertex(vertices[0])[upper ? 'v' : 'u']
  for (const u of vertices) {
    const d = graph.vertex(u)
    if (!d.dummy || d[upper ? 'v' : 'u'] !== lastParent) {
      if (seq.length > 0) {
        yield seq
        seq = []
      }
    }
    if (d.dummy) {
      seq.push(u)
      lastParent = d[upper ? 'v' : 'u']
    }
  }
  if (seq.length > 0) {
    yield seq
  }
}

const adjustPos = (graph, vertices, ltor) => {
  let sumPos = 0
  let totalWidth = 0
  for (const u of vertices) {
    sumPos += graph.vertex(u)[ltor ? 'x' : 'y']
    totalWidth += graph.vertex(u).origWidth || 0
  }
  let offset = sumPos / vertices.length - (totalWidth - 1) / 2
  for (const u of vertices) {
    graph.vertex(u)[ltor ? 'x' : 'y'] = offset
    offset += graph.vertex(u).origWidth || 0
  }
}

const bundleEdges = (graph, layers, ltor) => {
  for (let i = 0; i < layers.length - 1; ++i) {
    for (const vertices of segment(graph, layers[i], false)) {
      adjustPos(graph, vertices, ltor)
    }
  }
  for (let i = layers.length - 1; i > 0; --i) {
    for (const vertices of segment(graph, layers[i], true)) {
      adjustPos(graph, vertices, ltor)
    }
  }
}

module.exports = bundleEdges
