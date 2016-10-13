const priorityLayer = require('../sugiyama/position-assignment/priority')
const childLayers = require('./child-layers')

const priority = (graph, layers) => {
  for (const layer of layers) {
    layer.sort((u, v) => graph.vertex(u).order - graph.vertex(v).order)
  }

  const positions = {}
  const sizes = {}
  for (const layer of layers) {
    let hOffset = 0
    for (const u of layer) {
      const width = graph.vertex(u).width
      positions[u] = {x: hOffset + width / 2}
      sizes[u] = {width}
      hOffset += width / 2
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

  let vOffset = 0
  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i]
    const layerHeight = Math.max(...layer.map((u) => graph.vertex(u).height))
    for (const u of layer) {
      graph.vertex(u).xLocal = positions[u].x
      graph.vertex(u).yLocal = vOffset + layerHeight / 2
    }
    vOffset += layerHeight
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
  const top = Math.min(...children.map((v) => graph.vertex(v).yLocal - graph.vertex(v).height / 2))
  const bottom = Math.max(...children.map((v) => graph.vertex(v).yLocal + graph.vertex(v).height / 2))
  graph.vertex(u).width = right - left + 30
  graph.vertex(u).height = bottom - top + 30
}

const layoutGlobal = (graph, u) => {
  const children = graph.children(u)
  const uVertex = graph.vertex(u)
  const hOffset = uVertex.x - uVertex.width / 2 + 15
  const vOffset = uVertex.y - uVertex.height / 2 + 15
  if (children.length > 0) {
    for (const v of children) {
      const vertex = graph.vertex(v)
      vertex.x = hOffset + vertex.xLocal
      vertex.y = vOffset + vertex.yLocal
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
      vertex.y = vertex.height / 2
      layoutGlobal(graph, u)
    }
  }
  return result
}

module.exports = metricalLayout
