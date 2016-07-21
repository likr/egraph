const copy = require('../../graph/copy')

const ancestors = (graph, u) => {
  const result = []
  let v = u
  while (v !== null) {
    result.push(v)
    v = graph.parent(v)
  }
  return result
}

const inclusionPath = (graph, u, v) => {
  const uAncestors = ancestors(graph, u)
  const vAncestors = ancestors(graph, v)
  for (const w of uAncestors) {
    const index = vAncestors.indexOf(w)
    if (index > -1) {
      const upPath = uAncestors.slice(0, uAncestors.indexOf(w))
      const downPath = vAncestors.slice(0, index)
      upPath.reverse()
      downPath.reverse()
      return [upPath, downPath]
    }
  }
  return null
}

const derivedGraph = (inGraph) => {
  const graph = copy(inGraph)
  for (const [u, v] of graph.edges()) {
    const [upPath, downPath] = inclusionPath(graph, u, v)
    let count = 0
    for (let i = 0; i < upPath.length && i < downPath.length; ++i) {
      if (!graph.edge(upPath[i], downPath[i])) {
        count += 1
        graph.addEdge(upPath[i], downPath[i], {
          priority: upPath.length === downPath.length ? -2 : -1
        })
      }
    }
    if (upPath.length !== downPath.length) {
      graph.removeEdge(u, v)
    }
  }
  return graph
}

module.exports = derivedGraph
