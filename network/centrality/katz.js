const katz = (g) => {
  const alpha = 0.1
  const beta = 1.0
  const maxIter = 1000
  const tol = 1.0e-6
  const normalized = true
  const nnodes = g.numVertices()
  const b = {}
  const vertices = g.vertices()
  let x = {}
  let x0 = {}

  const err = () => {
    return vertices.reduce((e, u) => e + Math.abs(x[u] - x0[u]), 0)
  }

  for (const u of vertices) {
    x[u] = 0
    b[u] = beta
  }

  for (let i = 0; i < maxIter; ++i) {
    [x, x0] = [x0, x]
    for (const u of vertices) {
      x[u] = 0
    }

    for (const u of vertices) {
      for (const v of g.outVertices(u)) {
        x[v] += x0[u]
      }
      for (const v of g.inVertices(u)) {
        x[v] += x0[u]
      }
    }
    for (const u of vertices) {
      x[u] = alpha * x[u] + b[u]
    }

    if (err() < nnodes * tol) {
      break
    }
  }

  if (normalized) {
    const s = 1 / Math.sqrt(vertices.reduce((s, u) => s + x[u] * x[u], 0))
    for (const u of vertices) {
      x[u] *= s
    }
  }
  return x
}

module.exports = katz
