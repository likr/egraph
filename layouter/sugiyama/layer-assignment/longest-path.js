const longestPath = (g) => {
  const visited = {}
  const layers = {}

  const dfs = (u) => {
    if (visited[u]) {
      return layers[u]
    }
    visited[u] = true

    let layer = Infinity
    for (const v of g.outVertices(u)) {
      layer = Math.min(layer, dfs(v) - 1)
    }
    if (layer === Infinity) {
      layer = 0
    }
    layers[u] = layer
    return layer
  }

  for (const u of g.vertices()) {
    if (g.inDegree(u) === 0) {
      dfs(u)
    }
  }

  let minLayer = Infinity
  for (const u of g.vertices()) {
    minLayer = Math.min(minLayer, layers[u])
  }
  for (const u of g.vertices()) {
    layers[u] -= minLayer
  }

  return layers
}

class LongestPath {
  call (g) {
    return longestPath(g)
  }
}

module.exports = LongestPath
