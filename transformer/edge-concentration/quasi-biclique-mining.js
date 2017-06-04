const hashKey = (vertices) => {
  vertices.sort()
  return vertices.map((u) => u.toString()).join(',')
}

const maximalBicliques = (bicliques) => {
  const bs = Array.from(bicliques)
  bs.sort((b1, b2) => (b2.source.length + b2.target.length) - (b1.source.length + b1.target.length))
  const removed = bs.map(() => false)
  const n = bs.length
  for (let i = 0; i < n; ++i) {
    if (removed[i]) {
      continue
    }
    const b1 = bs[i]
    const sourceSet = new Set(b1.source)
    const targetSet = new Set(b1.target)
    for (let j = i + 1; j < n; ++j) {
      const b2 = bs[j]
      if (b2.source.every((u) => sourceSet.has(u)) && b2.target.every((v) => targetSet.has(v))) {
        removed[j] = true
      }
    }
  }
  return bs.filter((b, i) => !removed[i])
}

const quasiBicliqueMining = (graph, S, T, mu, minS = 2, minT = 2) => {
  const C = new Map()
  for (const u of S) {
    const outVertices = graph.outVertices(u)
    const tmpS = new Set()
    const tmpT = new Set(outVertices)
    C.set(hashKey(outVertices), {source: tmpS, target: tmpT})
  }
  // for (const v of T) {
  //   const inVertices = graph.inVertices(v)
  //   const tmpS = new Set(inVertices)
  //   const tmpT = new Set()
  //   C.set(hashKey(inVertices), {source: tmpS, target: tmpT})
  // }
  for (const key of C.keys()) {
    const M = new Map()
    const {source, target} = C.get(key)
    if (source.size === 0) {
      for (const v of target) {
        for (const u of graph.inVertices(v)) {
          if (!M.has(u)) {
            M.set(u, 0)
          }
          M.set(u, M.get(u) + 1)
        }
      }
      for (const u of M.keys()) {
        if (M.get(u) >= mu * target.size) {
          source.add(u)
        }
      }
    } else {
      for (const u of source) {
        for (const v of graph.outVertices(u)) {
          if (!M.has(v)) {
            M.set(v, 0)
          }
          M.set(v, M.get(v) + 1)
        }
      }
      for (const v of M.keys()) {
        if (M.get(v) >= mu * source.size) {
          target.add(v)
        }
      }
    }
  }

  const result = Array.from(C.values())
    .filter(({source, target}) => source.size >= minS && target.size >= minT)
    .map(({source, target}) => ({source: Array.from(source), target: Array.from(target)}))
  return maximalBicliques(result)
}

module.exports = quasiBicliqueMining
