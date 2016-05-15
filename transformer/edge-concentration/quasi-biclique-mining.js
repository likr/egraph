const hashKey = (vertices) => {
  return vertices.map((u) => u.toString()).join(',')
}

const maxKey = (iter) => {
  let maxVal = -Infinity
  let result = null
  for (const [id, val] of iter) {
    if (val > maxVal) {
      maxVal = val
      result = id
    }
  }
  return result
}

const partition = (graph, U) => {
  const L = new Set()
  for (const u of U) {
    for (const v of graph.outVertices(u)) {
      L.add(v)
    }
  }
  const hashKeys = new Map()
  for (const u of U) {
    hashKeys.set(u, hashKey(graph.outVertices(u)))
  }
  for (const u of L) {
    const degrees = graph.inVertices(u).map((v) => [v, graph.outDegree(v)])
    const maxId = maxKey(degrees)
    hashKeys.set(u, hashKeys.get(maxId))
  }
  let changed = false
  do {
    changed = false
    for (const u of U) {
      const M = new Map()
      for (const v of graph.outVertices(u)) {
        const hash = hashKeys.get(v)
        if (!M.has(hash)) {
          M.set(hash, 0)
        }
        M.set(hash, M.get(hash) + 1)
      }
      const newKey = maxKey(M.entries())
      if (hashKeys.get(u) !== newKey) {
        changed = true
        hashKeys.set(u, newKey)
      }
    }
    for (const u of L) {
      const M = new Map()
      for (const v of graph.inVertices(u)) {
        const hash = hashKeys.get(v)
        if (!M.has(hash)) {
          M.set(hash, 0)
        }
        M.set(hash, M.get(hash) + 1)
      }
      const newKey = maxKey(M.entries())
      if (hashKeys.get(u) !== newKey) {
        changed = true
        hashKeys.set(u, newKey)
      }
    }
  } while (changed)
  const result = new Map()
  for (const u of U) {
    const hash = hashKeys.get(u)
    if (!result.has(hash)) {
      result.set(hash, [])
    }
    result.get(hash).push(u)
  }
  return Array.from(result.values())
}

const augument = (graph, S) => {
  const result = new Set()
  for (const u of S) {
    for (const v of graph.outVertices(u)) {
      for (const w of graph.inVertices(v)) {
        result.add(w)
      }
    }
  }
  return Array.from(result)
}

const quasiBicliqueMining = (graph, mu, S) => {
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
    .filter(({source, target}) => source.size > 1 && target.size > 1)
  result.sort((c1, c2) => c1.source.size === c2.source.size ? c2.target.size - c1.target.size : c2.source.size - c1.source.size)
  if (result.length === 0) {
    return []
  }
  const maximum = result[0]
  for (let i = 1; i < result.length; ++i) {
    const tmpS = new Set(maximum.source)
    const tmpT = new Set(maximum.target)
    for (const u of result[i].source) {
      tmpS.add(u)
    }
    for (const u of result[i].target) {
      tmpT.add(u)
    }
    let count = 0
    for (const u of tmpS) {
      for (const v of tmpT) {
        if (graph.edge(u, v)) {
          count += 1
        }
      }
    }
    if (count < mu * tmpS.size * tmpT.size) {
      break
    }
    maximum.source = Array.from(tmpS)
    maximum.target = Array.from(tmpT)
  }
  return [maximum]
}

const quasiCliqueLayer = (graph, h1, h2, mu) => {
  const cliques = []
  for (const S of partition(graph, h1)) {
    for (const clique of quasiBicliqueMining(graph, mu, augument(graph, S))) {
      cliques.push(clique)
    }
  }
  return cliques
}

module.exports = quasiCliqueLayer
