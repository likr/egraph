const {combination} = require('js-combinatorics')

const enumerate = function * (neighbors, epsilon) {
  if (neighbors.size > 0) {
    const iter = combination(Array.from(neighbors), Math.min(epsilon, neighbors.size))
    while (true) {
      const S = iter.next()
      if (!S) {
        break
      }
      yield S
    }
  }
}

const adjacentVertices = (graph, vs) => {
  const result = new Set()
  for (const v of vs) {
    for (const u of graph.outVertices(v)) {
      result.add(u)
    }
  }
  return result
}

const genKey = (Vl, Vr) => {
  const arrayVl = Array.from(Vl)
  const arrayVr = Array.from(Vr)
  arrayVl.sort()
  arrayVr.sort()
  return `${arrayVl.join(',')}:${arrayVr.join(',')}`
}

const subspace = (graph, candVl, candExt, epsilon, ms, result) => {
  const candVr = adjacentVertices(graph, candVl)
  for (const v of candVr) {
    let count = 0
    for (const u of graph.inVertices(v)) {
      if (candVl.has(u)) {
        count += 1
      }
    }
    if (candVl.size - count > epsilon) {
      candVr.delete(v)
    }
  }
  const key = genKey(candVl, candVr)
  if (result.has(key)) {
    return
  }
  if (candVl.size >= ms && candVr.size >= ms) {
    const source = Array.from(candVl)
    const target = Array.from(candVr)
    source.sort()
    target.sort()
    result.set(key, {source, target})
  }
  for (const v of candVr) {
    candExt.delete(v)
  }
  for (const v of candExt) {
    const candExt2 = new Set(candExt)
    candExt2.delete(v)
    const neighbors = new Set(candVl)
    for (const u of graph.inVertices(v)) {
      neighbors.delete(u)
    }
    for (const S of enumerate(neighbors, epsilon)) {
      const Vl = new Set(graph.inVertices(v))
      for (const u of S) {
        Vl.add(u)
      }
      subspace(graph, Vl, candExt2, epsilon, ms, result)
    }
  }
}

const completeQB = (graph, h1, h2, epsilon, ms) => {
  const bicliques = new Map()
  for (const v of h2) {
    const neighbors = new Set(h1)
    for (const u of graph.inVertices(v)) {
      neighbors.delete(u)
    }
    for (const S of enumerate(neighbors, epsilon)) {
      const Vl = new Set(graph.inVertices(v))
      for (const u of S) {
        Vl.add(u)
      }
      subspace(graph, Vl, new Set(h2), epsilon, ms, bicliques)
    }
  }
  return Array.from(bicliques.values())
}

module.exports = completeQB
