class AbstractGraph {
  edges () {
    const edges = []
    for (const u of this.vertices()) {
      for (const v of this.outVertices(u)) {
        edges.push([u, v])
      }
    }
    return edges
  }

  * outEdges (u) {
    for (let v of this.outVertices(u)) {
      yield [u, v]
    }
  }

  * inEdges (u) {
    for (let v of this.inVertices(u)) {
      yield [v, u]
    }
  }

  toJSON () {
    return {
      vertices: this.vertices().map((u) => ({u, d: this.vertex(u)})),
      edges: this.edges().map(([u, v]) => ({u, v, d: this.edge(u, v)}))
    }
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }
}

module.exports = AbstractGraph
