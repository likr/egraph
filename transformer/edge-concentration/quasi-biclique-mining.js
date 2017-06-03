const hashKey = (vertices) => {
  vertices.sort()
  return vertices.map((u) => u.toString()).join(',')
}

const quasiBicliqueMining = (graph, S, T, mu, minS = 2, minT = 2) => {
  const C = new Map()
  for (const u of S) {
    const tmpS = new Set()
    const tmpT = new Set(graph.outVertices(u))
    C.set(hashKey(Array.from(tmpT)), {source: tmpS, target: tmpT})
  }
  for (const key of C.keys()) {
    const M = new Map()
    for (const v of C.get(key).target) {
      for (const u of graph.inVertices(v)) {
        if (!M.has(u)) {
          M.set(u, 0)
        }
        M.set(u, M.get(u) + 1)
      }
    }
    for (const u of M.keys()) {
      if (M.get(u) >= mu * C.get(key).target.size) {
        C.get(key).source.add(u)
      }
    }
  }

  const result = Array.from(C.values())
    .filter(({source, target}) => source.size >= minS && target.size >= minT)
    .map(({source, target}) => ({source: Array.from(source), target: Array.from(target)}))
  return result
}

module.exports = quasiBicliqueMining
