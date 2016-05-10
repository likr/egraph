const Graph = require('../graph')

const normalize = function (g, layers, edgeMargin) {
  var i, w1, w2
  for (let [u, v] of g.edges()) {
    const d = g.edge(u, v)
    if (layers[v] - layers[u] > 1) {
      w1 = u
      for (i = layers[u] + 1; i < layers[v]; ++i) {
        w2 = Symbol()
        g.addVertex(w2, {
          dummy: true,
          width: d.width + edgeMargin,
          height: 0,
          layer: i
        })
        g.addEdge(w1, w2, {
          width: d.width,
          dummy: true
        })
        w1 = w2
      }
      g.addEdge(w1, v, {
        dummy: true
      })
      g.removeEdge(u, v)
    }
  }
}

const vertexPositions = (gOrig, g, layers) => {
  const vertices = gOrig.vertices()
  const n = vertices.length
  const sink = {}

  sink[vertices[0]] = n - 1
  for (let i = n - 1; i >= 0; --i) {
    const v = vertices[i]
    if (sink[v] !== undefined) {
      continue
    }
    sink[v] = i
    let u = gOrig.inVertices(v)[0]
    while (gOrig.inDegree(u) > 0 && sink[u] === undefined) {
      sink[u] = sink[v]
      u = gOrig.inVertices(u)[0]
    }
  }

  const offset = {}
  const x = {}
  for (let i = 0; i < n; ++i) {
    offset[i] = 0
  }
  x[vertices[0]] = g.vertex(vertices[0]).width / 2

  const assignX = (u, w) => {
    let xMax = 0
    let i = layers[w]
    let v = w
    while (v !== u) {
      xMax = Math.max(xMax, offset[i] + g.vertex(v).width / 2)
      v = g.inVertices(v)[0]
      i -= 1
    }
    xMax = Math.max(xMax, x[u])
    x[w] = xMax

    i = layers[w]
    v = w
    while (v !== u) {
      offset[i] = xMax + g.vertex(v).width / 2
      v = g.inVertices(v)[0]
      i -= 1
    }
  }

  const dfs = (u) => {
    const vs = gOrig.outVertices(u)
    vs.sort((v1, v2) => sink[v2] - sink[v1])
    for (const v of vs) {
      assignX(u, v)
      dfs(v)
    }
  }

  dfs(vertices[0], 0)

  return x
}

class ImaiTreeLayouter {
  layout (gOrig) {
    const vertexWidth = 10
    const vertexHeight = 10
    const edgeWidth = 1
    const layerMargin = 10
    const vertexMargin = 1
    const edgeMargin = 1

    const g = new Graph()
    const layers = {}
    let index = 0
    for (const u of gOrig.vertices()) {
      layers[u] = index++
      g.addVertex(u, {
        width: vertexWidth + vertexMargin,
        height: vertexHeight + layerMargin
      })
    }
    for (const [u, v] of gOrig.edges()) {
      g.addEdge(u, v, {
        width: edgeWidth + edgeMargin
      })
    }

    normalize(g, layers, edgeMargin)

    const x = vertexPositions(gOrig, g, layers)
    const vertices = {}
    const edges = {}
    for (const u of gOrig.vertices()) {
      vertices[u] = {
        x: x[u],
        y: (layers[u] + 1) * (vertexHeight + layerMargin),
        width: vertexWidth,
        height: vertexHeight
      }
    }
    for (const u of gOrig.vertices()) {
      edges[u] = {}
      for (const v of gOrig.outVertices(u)) {
        const points = layers[v] - layers[u] > 1
          ? [
            [vertices[u].x, vertices[u].y + vertices[u].height / 2],
            [vertices[v].x, vertices[u].y + vertices[u].height + layerMargin],
            [vertices[v].x, vertices[v].y - vertices[v].height / 2]
          ]
          : [
            [vertices[u].x, vertices[u].y + vertices[u].height / 2],
            [vertices[v].x, vertices[v].y - vertices[v].height / 2]
          ]
        edges[u][v] = {
          points: points,
          width: edgeWidth
        }
      }
    }

    return {vertices, edges}
  }
}

module.exports = ImaiTreeLayouter
