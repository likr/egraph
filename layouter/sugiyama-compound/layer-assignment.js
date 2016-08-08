const layerAssignmentRec = (graph, root, clev) => {
}

const layerAssignment = (graph) => {
  const result = new Map()
  for (const u of graph.vertices()) {
    if (graph.parent(u)) {
      continue
    }
    layerAssignmentRec(graph, u, [0])
  }
  return result
}

module.exports = layerAssignment
