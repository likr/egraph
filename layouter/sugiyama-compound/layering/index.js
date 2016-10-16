const accessor = require('../../../utils/accessor')
const {compoundLayering} = require('./compound-layering')

const longestPath = (graph) => {
  const visited = {}
  const layers = {}

  const dfs = (u) => {
    if (visited[u]) {
      return layers[u]
    }
    visited[u] = true

    let layer = -Infinity
    for (const v of graph.inVertices(u)) {
      layer = Math.max(layer, graph.edge(v, u).priority === -2 ? dfs(v) : dfs(v) + 1)
    }
    if (layer === -Infinity) {
      layer = 0
    }
    layers[u] = layer
    return layer
  }

  for (const u of graph.vertices()) {
    if (graph.outDegree(u) === 0) {
      dfs(u)
    }
  }

  return layers
}

const CompoundLayering = (() => {
  const privates = new WeakMap()

  return class Layering {
    constructor () {
      privates.set(this, {
        method: longestPath
      })
    }

    call (graph) {
      compoundLayering(graph, this.method())
    }

    method () {
      return accessor(this, privates, 'method', arguments)
    }
  }
})()

exports.CompoundLayering = CompoundLayering
