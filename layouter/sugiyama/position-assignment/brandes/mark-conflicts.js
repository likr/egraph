const layerEdges = require('../../misc/layer-edges')

const split = (x, f) => {
  const y = []
  const z = []
  for (const xi of x) {
    if (f(xi)) {
      y.push(xi)
    } else {
      z.push(xi)
    }
  }
  return [y, z]
}

const markConflicts = (g, layers) => {
  const h = layers.length - 2
  const dummy = {}
  const order = {}
  const isInner = ([u, v]) => dummy[u] && dummy[v]

  for (const u of g.vertices()) {
    const d = g.vertex(u)
    dummy[u] = !!d.dummy
    order[u] = d.order
  }

  for (let i = 1; i < h; ++i) {
    const h1 = layers[i]
    const h2 = layers[i + 1]
    const edges = layerEdges(g, h1, h2)
    const [innerSegments, outerSegments] = split(edges, isInner)
    for (const [u1, v1] of innerSegments) {
      for (const [u2, v2] of outerSegments) {
        if ((order[u1] < order[u2] && order[v1] > order[v2]) || (order[u1] > order[u2] && order[v1] < order[v2])) {
          g.edge(u2, v2).type1Conflict = true
        }
      }
    }
  }
}

module.exports = markConflicts
