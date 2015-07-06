'use strict';

const privates = new WeakMap();

const p = (self) => privates.get(self);

class Graph {
  constructor(idOffset=0) {
    privates.set(this, {
      vertices: {},
      numVertices: 0,
      numEdges: 0,
      idOffset: idOffset
    });
  }

  vertex(u) {
    if (p(this).vertices[u]) {
      return p(this).vertices[u].data;
    }
    return null;
  }

  edge(u, v) {
    if (p(this).vertices[u] && p(this).vertices[u].outVertices[v]) {
      return p(this).vertices[u].outVertices[v];
    }
    return null;
  }

  vertices() {
    return Object.keys(p(this).vertices).map(u => +u);
  }

  edges() {
    const edges = [];
    for (let u in p(this).vertices) {
      for (let v in p(this).vertices[u].outVertices) {
        edges.push([+u, +v]);
      }
    }
    return edges;
  }

  outVertices(u) {
    return Object.keys(p(this).vertices[u].outVertices).map(v => +v);
  }

  inVertices(u) {
    return Object.keys(p(this).vertices[u].inVertices).map(v => +v);
  }

  *outEdges(u) {
    for (let v of this.outVertices(u)) {
      yield [u, v];
    }
  }

  *inEdges(u) {
    for (let v of this.inVertices(u)) {
      yield [v, u];
    }
  }

  numVertices() {
    return p(this).numVertices;
  }

  numEdges() {
    return p(this).numEdges;
  }

  outDegree(u) {
    return Object.keys(p(this).vertices[u].outVertices).length;
  }

  inDegree(u) {
    return Object.keys(p(this).vertices[u].inVertices).length;
  }

  addVertex(u, obj) {
    const nextVertexId = () => {
      while (p(this).vertices[p(this).idOffset]) {
        p(this).idOffset++;
      }
      return p(this).idOffset++;
    };

    if (u === undefined) {
      u = {};
    }
    if (obj === undefined) {
      obj = u;
      u = nextVertexId();
    }
    if (this.vertex(u)) {
      p(this).vertices[u].data = obj;
    } else {
      p(this).vertices[u] = {
        outVertices: {},
        inVertices: {},
        children: new Set(),
        parents: new Set(),
        data: obj
      };
      p(this).numVertices++;
    }
    return u;
  }

  addEdge(u, v, obj={}) {
    if (!this.edge(u, v)) {
      p(this).numEdges++;
    }
    p(this).vertices[u].outVertices[v] = obj;
    p(this).vertices[v].inVertices[u] = obj;
  }

  addChild(u, v) {
    p(this).vertices[u].children.add(u);
    p(this).vertices[v].parents.add(v);
  }

  removeVertex(u) {
    for (let v of this.outVertices(u)) {
      this.removeEdge(u, v);
    }
    for (let v of this.inVertices(u)) {
      this.removeEdge(v, u);
    }
    delete p(this).vertices[u];
    p(this).numVertices--;
  }

  removeEdge(u, v) {
    delete p(this).vertices[u].outVertices[v];
    delete p(this).vertices[v].inVertices[u];
    p(this).numEdges--;
  }

  toString() {
    const obj = {
      vertices: this.vertices().map(u => ({u, d: this.vertex(u)})),
      edges: this.edges().map(([u, v]) => ({u, v, d: this.edge(u, v)}))
    };
    return JSON.stringify(obj);
  }
}

export default Graph;
