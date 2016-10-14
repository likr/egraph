const accessor = require('../../../utils/accessor')
const edgeFunction = require('../../../utils/edge-function')
const Graph = require('../../../graph')
const replace = require('./replace')

const hasPath = (graph, source, target) => {
  const visited = new Set()
  const queue = [source]
  while (queue.length) {
    const u = queue.shift()
    if (visited.has(u)) {
      continue
    }
    for (const v of graph.outVertices(u)) {
      if (v === target) {
        return true
      }
      queue.push(v)
    }
  }
  return false
}

const minweight = (graph, weight) => {
  const edges = graph.edges().map(([u, v]) => {
    return {
      u,
      v,
      weight: weight(u, v)
    }
  })
  edges.sort((e1, e2) => e2.weight - e1.weight)
  const S = []
  const T = []
  const SGraph = new Graph()
  for (const u of graph.vertices()) {
    SGraph.addVertex(u)
  }
  for (const {u, v} of edges) {
    if (hasPath(SGraph, v, u)) {
      T.push([u, v])
    } else {
      S.push([u, v])
      SGraph.addEdge(u, v)
    }
  }
  return T
}

const privates = new WeakMap()

class MinWeight {
  constructor () {
    privates.set(this, {
      weight: () => 1
    })
  }

  call (graph) {
    const cycleEdges = minweight(graph, edgeFunction(this.weight(), graph))
    replace(graph, cycleEdges)
  }

  weight () {
    return accessor(this, privates, 'weight', arguments)
  }
}

module.exports = MinWeight
