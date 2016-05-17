const Graph = require('../../graph')
const accessor = require('../../utils/accessor')
const connectedComponents = require('./misc/connected-components')
const groupLayers = require('./misc/group-layers')
const cycleRemoval = require('./cycle-removal')
const layerAssignment = require('./layer-assignment')
const normalize = require('./normalize')
const crossingReduction = require('./crossing-reduction')
const positionAssignment = require('./position-assignment')
const bundleEdges = require('./bundle-edges')

const initGraph = (gOrig, {ltor, vertexWidth, vertexHeight, edgeWidth, layerMargin, vertexMargin, vertexLeftMargin, vertexRightMargin, vertexTopMargin, vertexBottomMargin}) => {
  const g = new Graph()
  for (const u of gOrig.vertices()) {
    const d = gOrig.vertex(u)
    const w = vertexWidth({u, d})
    const h = vertexHeight({u, d})
    const horizontalMargin = vertexLeftMargin({u, d}) + vertexRightMargin({u, d})
    const verticalMargin = vertexTopMargin({u, d}) + vertexBottomMargin({u, d})
    g.addVertex(u, {
      width: ltor ? h + vertexMargin + verticalMargin : w + layerMargin + horizontalMargin,
      height: ltor ? w + layerMargin + horizontalMargin : h + vertexMargin + verticalMargin,
      origWidth: ltor ? h : w,
      origHeight: ltor ? w : h
    })
  }
  for (const [u, v] of gOrig.edges()) {
    g.addEdge(u, v, {
      width: edgeWidth({
        u,
        v,
        ud: gOrig.vertex(u),
        vd: gOrig.vertex(v),
        d: gOrig.edge(u, v)
      })
    })
  }
  return g
}

const simplify = (points, ltor) => {
  let index = 1
  while (index < points.length - 1) {
    const x0 = ltor ? points[index][1] : points[index][0]
    const x1 = ltor ? points[index + 1][1] : points[index + 1][0]
    if (x0 === x1) {
      points.splice(index, 2)
    } else {
      index += 2
    }
  }
}

const reversed = (arr) => {
  const result = []
  for (const x of arr) {
    result.unshift(x)
  }
  return result
}

const buildResult = (g, layers, ltor) => {
  const result = {
    vertices: {},
    edges: {}
  }
  const layerHeights = []

  for (const u of g.vertices()) {
    result.edges[u] = {}
  }

  for (const layer of layers) {
    let maxHeight = -Infinity
    for (const u of layer) {
      maxHeight = Math.max(maxHeight, g.vertex(u).origHeight || 0)
    }
    layerHeights.push(maxHeight)
  }

  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i]
    const layerHeight = layerHeights[i]
    for (const u of layer) {
      const uNode = g.vertex(u)
      if (!uNode.dummy) {
        result.vertices[u] = {
          x: ltor ? uNode.y : uNode.x,
          y: ltor ? uNode.x : uNode.y,
          width: ltor ? uNode.origHeight : uNode.origWidth,
          height: ltor ? uNode.origWidth : uNode.origHeight,
          layer: uNode.layer,
          order: uNode.order
        }

        for (const v of g.outVertices(u)) {
          const points = ltor
            ? [[uNode.y + (uNode.origHeight || 0) / 2, uNode.x], [uNode.y + layerHeight / 2, uNode.x]]
            : [[uNode.x, uNode.y + (uNode.origHeight || 0) / 2], [uNode.x, uNode.y + layerHeight / 2]]
          let w = v
          let wNode = g.vertex(w)
          let j = i + 1
          while (wNode.dummy) {
            if (ltor) {
              points.push([wNode.y - layerHeights[j] / 2, wNode.x])
              points.push([wNode.y + layerHeights[j] / 2, wNode.x])
            } else {
              points.push([wNode.x, wNode.y - layerHeights[j] / 2])
              points.push([wNode.x, wNode.y + layerHeights[j] / 2])
            }
            w = g.outVertices(w)[0]
            wNode = g.vertex(w)
            j += 1
          }
          if (ltor) {
            points.push([wNode.y - layerHeights[j] / 2, wNode.x])
            points.push([wNode.y - (wNode.origHeight || 0) / 2, wNode.x])
          } else {
            points.push([wNode.x, wNode.y - layerHeights[j] / 2])
            points.push([wNode.x, wNode.y - (wNode.origHeight || 0) / 2])
          }
          simplify(points, ltor)
          if (g.edge(u, v).reversed) {
            result.edges[w][u] = {
              points: reversed(points),
              reversed: true,
              width: g.edge(u, v).width
            }
          } else {
            result.edges[u][w] = {
              points: points,
              reversed: false,
              width: g.edge(u, v).width
            }
          }
        }
      }
    }
  }

  return result
}

const privates = new WeakMap()

class SugiyamaLayouter {
  constructor () {
    privates.set(this, {
      vertexWidth: ({d}) => d.width,
      vertexHeight: ({d}) => d.height,
      edgeWidth: () => 1,
      layerMargin: 10,
      vertexMargin: 10,
      vertexLeftMargin: () => 0,
      vertexRightMargin: () => 0,
      vertexTopMargin: () => 0,
      vertexBottomMargin: () => 0,
      edgeMargin: 10,
      ltor: true,
      edgeBundling: false,
      cycleRemoval: new cycleRemoval.CycleRemoval(),
      layerAssignment: new layerAssignment.QuadHeuristic(),
      crossingReduction: new crossingReduction.LayerSweep(),
      positionAssignment: new positionAssignment.Brandes()
    })
  }

  layout (gOrig) {
    const g = initGraph(gOrig, {
      vertexWidth: this.vertexWidth(),
      vertexHeight: this.vertexHeight(),
      edgeWidth: this.edgeWidth(),
      layerMargin: this.layerMargin(),
      vertexMargin: this.vertexMargin(),
      vertexLeftMargin: this.vertexLeftMargin(),
      vertexRightMargin: this.vertexRightMargin(),
      vertexTopMargin: this.vertexTopMargin(),
      vertexBottomMargin: this.vertexBottomMargin(),
      ltor: this.ltor()
    })
    this.cycleRemoval().call(g)
    const layerMap = this.layerAssignment().call(g)
    const layers = groupLayers(g, layerMap, true)
    normalize(g, layers, layerMap, this.edgeMargin(), this.layerMargin())
    const normalizedLayers = layers.map(() => [])
    for (const component of connectedComponents(g)) {
      const vertices = new Set(component)
      const componentLayers = layers.map((h) => h.filter((u) => vertices.has(u)))
      this.crossingReduction().call(g, componentLayers)
      for (let i = 0; i < layers.length; ++i) {
        for (const u of componentLayers[i]) {
          normalizedLayers[i].push(u)
        }
      }
    }
    for (let i = 0; i < normalizedLayers.length; ++i) {
      const layer = normalizedLayers[i]
      for (let j = 0; j < layer.length; ++j) {
        const u = layer[j]
        g.vertex(u).layer = i
        g.vertex(u).order = j
      }
    }
    this.positionAssignment().call(g, normalizedLayers)
    if (this.edgeBundling()) {
      bundleEdges(g, normalizedLayers, this.ltor())
    }
    return buildResult(g, normalizedLayers, this.ltor())
  }

  vertexWidth () {
    return accessor(this, privates, 'vertexWidth', arguments)
  }

  vertexHeight () {
    return accessor(this, privates, 'vertexHeight', arguments)
  }

  edgeWidth () {
    return accessor(this, privates, 'edgeWidth', arguments)
  }

  layerMargin () {
    return accessor(this, privates, 'layerMargin', arguments)
  }

  vertexMargin () {
    return accessor(this, privates, 'vertexMargin', arguments)
  }

  edgeMargin () {
    return accessor(this, privates, 'edgeMargin', arguments)
  }

  vertexLeftMargin () {
    return accessor(this, privates, 'vertexLeftMargin', arguments)
  }

  vertexRightMargin () {
    return accessor(this, privates, 'vertexRightMargin', arguments)
  }

  vertexTopMargin () {
    return accessor(this, privates, 'vertexTopMargin', arguments)
  }

  vertexBottomMargin () {
    return accessor(this, privates, 'vertexBottomMargin', arguments)
  }

  ltor () {
    return accessor(this, privates, 'ltor', arguments)
  }

  edgeBundling () {
    return accessor(this, privates, 'edgeBundling', arguments)
  }

  cycleRemoval () {
    return accessor(this, privates, 'cycleRemoval', arguments)
  }

  layerAssignment () {
    return accessor(this, privates, 'layerAssignment', arguments)
  }

  crossingReduction () {
    return accessor(this, privates, 'crossingReduction', arguments)
  }

  positionAssignment () {
    return accessor(this, privates, 'positionAssignment', arguments)
  }
}

module.exports = SugiyamaLayouter
