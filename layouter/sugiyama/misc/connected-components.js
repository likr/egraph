const markChildren = (graph, u, id, result) => {
  if (result.has(u)) {
    const prevId = result.get(u)
    if (prevId !== id) {
      for (const v of graph.vertices()) {
        if (result.get(v) === prevId) {
          result.set(v, id)
        }
      }
    }
    return
  }
  result.set(u, id)
  for (const v of graph.outVertices(u)) {
    markChildren(graph, v, id, result)
  }
}

const connectedComponents = (graph) => {
  const componentIdMap = new Map()
  for (const u of graph.vertices()) {
    if (graph.inDegree(u) === 0) {
      markChildren(graph, u, u, componentIdMap)
    }
  }
  const componentIds = new Set(componentIdMap.values())
  return Array.from(componentIds).map((u) => {
    return graph.vertices().filter((v) => componentIdMap.get(v) === u)
  })
}

module.exports = connectedComponents
