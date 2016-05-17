const {combination} = require('js-combinatorics')

const enumerate = function * (neighbors, epsilon) {
  if (neighbors.size > 0) {
    for (let i = epsilon; i > 0; --i) {
      const iter = combination(Array.from(neighbors), Math.min(i, neighbors.size))
      while (true) {
        const S = iter.next()
        if (!S) {
          break
        }
        yield S
      }
    }
    yield []
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

const countError = (graph, u, vertices, ltou) => {
  const neighbors = new Set(ltou ? graph.inVertices(u) : graph.outVertices(u))
  let count = 0
  for (const v of vertices) {
    if (!neighbors.has(v)) {
      count += 1
    }
  }
  return count
}

const intersection = (A, B) => {
  const result = new Set()
  for (const item of A) {
    if (B.has(item)) {
      result.add(item)
    }
  }
  return result
}

const setminus = (A, B) => {
  for (const item of B) {
    A.delete(item)
  }
  return A
}

const store = (result, key, Vl, Vr) => {
  for (const [key, {source, target}] of result.entries()) {
    const sourceIntersection = intersection(source, Vl)
    const targetIntersection = intersection(target, Vr)
    if (sourceIntersection.size === source.size && targetIntersection.size === target.size) {
      result.delete(key)
    } else if (sourceIntersection.size === Vl.size && targetIntersection.size === Vr.size) {
      return
    }
  }
  result.set(key, {source: Vl, target: Vr})
}

const testEpsilonQuasiBiclique = (graph, source, target, epsilon, ms) => {
  if (source.size < ms || target.size < ms) {
    return false
  }
  for (const u of source) {
    const vertices = new Set(graph.outVertices(u))
    let count = 0
    for (const v of target) {
      if (!vertices.has(v)) {
        count += 1
      }
    }
    if (count > epsilon) {
      return false
    }
  }
  for (const u of target) {
    const vertices = new Set(graph.inVertices(u))
    let count = 0
    for (const v of source) {
      if (!vertices.has(v)) {
        count += 1
      }
    }
    if (count > epsilon) {
      return false
    }
  }
  return true
}

const subspace = (graph, candVl, genVl, candExt, epsilon, ms, visited, result) => {
  const candVr = adjacentVertices(graph, candVl)
  for (const v of candVr) {
    if (countError(graph, v, candVl, true) > epsilon) {
      candVr.delete(v)
    }
  }

  const key = genKey(candVl, candVr)
  if (visited.has(key)) {
    return
  }
  visited.add(key)
  if (testEpsilonQuasiBiclique(graph, candVl, candVr, epsilon, ms)) {
    store(result, key, candVl, candVr)
  }

  setminus(candExt, candVr)
  for (const v of candExt) {
    candExt.delete(v)
    const neighbors = intersection(candVl, new Set(graph.inVertices(v)))
    const rest = setminus(new Set(candVl), neighbors)
    for (const S of enumerate(rest, epsilon)) {
      const Vl = new Set(neighbors)
      for (const u of S) {
        Vl.add(u)
      }
      subspace(graph, Vl, v, candExt, epsilon, ms, visited, result)
    }
  }
}

const completeQB = (graph, h1, h2, epsilon, ms) => {
  const bicliques = new Map()
  const visited = new Set()
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
      subspace(graph, Vl, v, new Set(h2), epsilon, ms, visited, bicliques)
    }
  }
  return Array.from(bicliques.values()).map(({source, target}) => {
    const sourceArray = Array.from(source)
    const targetArray = Array.from(target)
    sourceArray.sort()
    targetArray.sort()
    return {
      source: sourceArray,
      target: targetArray
    }
  })
}

module.exports = completeQB
