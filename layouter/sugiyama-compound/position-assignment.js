const priorityLayer = require('../sugiyama/position-assignment/priority')
const childLayers = require('./child-layers')
const compareClev = require('./compare-clev')

const priority = (graph, layers) => {
  layers = layers.filter((layer) => layer.length > 0)
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
      hOffset += width
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

  const left = Math.min(...layers.map((layer) => {
    return Math.min(...layer.map((u) => positions[u].x - graph.vertex(u).width / 2))
  }))
  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i]
    for (const u of layer) {
      graph.vertex(u).xLocal = positions[u].x - left
    }
  }
}

const layoutLocal = (graph, u, hMargin) => {
  const children = graph.children(u)
  for (const v of children) {
    if (graph.children(v).length > 0) {
      layoutLocal(graph, v, hMargin)
    }
  }
  priority(graph, childLayers(graph, u))
  const left = Math.min(...children.map((v) => graph.vertex(v).xLocal - graph.vertex(v).width / 2))
  const right = Math.max(...children.map((v) => graph.vertex(v).xLocal + graph.vertex(v).width / 2))
  graph.vertex(u).width = right - left + hMargin * 2
  graph.vertex(u).origWidth = graph.vertex(u).width - hMargin
}

const layoutGlobal = (graph, u, hMargin) => {
  const uVertex = graph.vertex(u)
  const hOffset = uVertex.x - uVertex.width / 2 + hMargin
  for (const v of graph.children(u)) {
    const vertex = graph.vertex(v)
    vertex.x = hOffset + vertex.xLocal
    layoutGlobal(graph, v, hMargin)
  }
}

const layerKey = (layer) => {
  return layer.join(',')
}

const assignHeight = (graph, layerVertices, vMargin, offset, key) => {
  const vertices = layerVertices.get(key)
  const childLayers = new Map()
  for (const u of vertices) {
    for (const v of graph.children(u)) {
      const childKey = layerKey(graph.vertex(v).layer)
      if (!childLayers.has(childKey)) {
        childLayers.set(childKey, [])
      }
      childLayers.get(childKey).push(v)
    }
  }

  if (childLayers.size === 0) {
    const maxHeight = Math.max(...vertices.map((u) => graph.vertex(u).height))
    for (const u of vertices) {
      const vertex = graph.vertex(u)
      vertex.y = offset + maxHeight / 2
      if (vertex.dummy) {
        vertex.height = maxHeight
      }
    }
    return maxHeight
  } else {
    let totalHeight = vMargin * 2
    let childOffset = offset + vMargin
    const childKeys = Array.from(childLayers.keys())
    childKeys.sort((key1, key2) => {
      return compareClev(key1.split(',').map((v) => +v), key2.split(',').map((v) => +v))
    })
    for (const childKey of childKeys) {
      const childHeight = assignHeight(graph, layerVertices, vMargin, childOffset, childKey)
      totalHeight += childHeight
      childOffset += childHeight
    }
    for (const u of vertices) {
      graph.vertex(u).height = totalHeight
      graph.vertex(u).origHeight = totalHeight - vMargin
      graph.vertex(u).y = offset + totalHeight / 2
    }
    return totalHeight
  }
}

const verticalLayout = (graph, root, vMargin) => {
  const layersSet = new Set()
  for (const u of graph.vertices()) {
    layersSet.add(layerKey(graph.vertex(u).layer))
  }
  const layers = Array.from(layersSet)
  const layerVertices = new Map(layers.map((layer) => [layer, []]))
  for (const u of graph.vertices()) {
    layerVertices.get(layerKey(graph.vertex(u).layer)).push(u)
  }
  assignHeight(graph, layerVertices, vMargin, 0, layerKey(graph.vertex(root).layer))
}

const metricalLayout = (graph, hMargin = 10, vMargin = 10) => {
  for (const u of graph.vertices()) {
    if (graph.parent(u) == null) {
      layoutLocal(graph, u, hMargin, vMargin)
      const vertex = graph.vertex(u)
      vertex.x = vertex.width / 2
      vertex.y = vertex.height / 2
      layoutGlobal(graph, u, hMargin, vMargin)
      verticalLayout(graph, u, vMargin)
    }
  }
}

module.exports = metricalLayout
