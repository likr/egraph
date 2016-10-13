const priorityLayer = require('../sugiyama/position-assignment/priority')
const childLayers = require('./child-layers')

const priority = (graph, layers) => {
  for (const layer of layers) {
    layer.sort((u, v) => graph.vertex(u).order - graph.vertex(v).order)
  }

  const positions = {}
  const sizes = {}
  for (const layer of layers) {
    let offset = 0
    for (const u of layer) {
      const width = graph.vertex(u).width
      positions[u] = {x: offset + width / 2}
      sizes[u] = {width}
      offset += width / 2
    }
  }

  for (let i = 1; i < layers.length; ++i) {
    priorityLayer(graph, layers[i - 1], layers[i], positions, sizes, false)
  }
  for (let i = layers.length - 1; i > 0; --i) {
    priorityLayer(graph, layers[i - 1], layers[i], positions, sizes, true)
  }
  for (let i = 1; i < layers.length; ++i) {
    priorityLayer(graph, layers[i - 1], layers[i], positions, sizes, false)
  }

  for (const layer of layers) {
    for (const u of layer) {
      graph.vertex(u).xLocal = positions[u].x
    }
  }
}

const layoutLocal = (graph, u) => {
  const children = graph.children(u)
  for (const v of children) {
    if (graph.children(v).length > 0) {
      layoutLocal(graph, v)
    }
  }
  priority(graph, childLayers(graph, u))
  const left = Math.min(...children.map((v) => graph.vertex(v).xLocal - graph.vertex(v).width / 2))
  const right = Math.max(...children.map((v) => graph.vertex(v).xLocal + graph.vertex(v).width / 2))
  graph.vertex(u).width = right - left
}

const layoutGlobal = (graph, u) => {
  const children = graph.children(u)
  const uVertex = graph.vertex(u)
  const offset = uVertex.x - uVertex.width / 2
  if (children.length > 0) {
    for (const v of children) {
      const vertex = graph.vertex(v)
      vertex.x = offset + vertex.xLocal
      layoutGlobal(graph, v)
    }
  }
}

const metricalLayout = (graph) => {
  const result = new Map()
  for (const u of graph.vertices()) {
    if (graph.parent(u) == null) {
      layoutLocal(graph, u)
      const vertex = graph.vertex(u)
      vertex.x = vertex.width / 2
      layoutGlobal(graph, u)
    }
  }
  return result
}

module.exports = metricalLayout
