'use strict';

const graph = function () {

  var vertices = {},
      numVertices = 0,
      numEdges = 0,
      idOffset = 0;

  function nextVertexId() {
    while (vertices[idOffset]) {
      idOffset++;
    }
    return idOffset++;
  }

  class Graph {
    vertex(u) {
      if (vertices[u]) {
        return vertices[u].data;
      }
      return null;
    }

    edge(u, v) {
      if (vertices[u] && vertices[u].outVertices[v]) {
        return vertices[u].outVertices[v];
      }
      return null;
    }

    vertices() {
      return Object.keys(vertices).map(u => +u);
    }

    edges() {
      const edges = [];
      for (let u in vertices) {
        for (let v in vertices[u].outVertices) {
          edges.push([+u, +v]);
        }
      }
      return edges;
    }

    outVertices(u) {
      return Object.keys(vertices[u].outVertices).map(v => +v);
    }

    inVertices(u) {
      return Object.keys(vertices[u].inVertices).map(v => +v);
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
      return numVertices;
    }

    numEdges() {
      return numEdges;
    }

    outDegree(u) {
      return Object.keys(vertices[u].outVertices).length;
    }

    inDegree(u) {
      return Object.keys(vertices[u].inVertices).length;
    }

    addVertex(u, obj) {
      if (u === undefined) {
        u = {};
      }
      if (obj === undefined) {
        obj = u;
        u = nextVertexId();
      }
      vertices[u] = {
        outVertices: {},
        inVertices: {},
        children: new Set(),
        parents: new Set(),
        data: obj
      };
      numVertices++;
      return u;
    }

    addEdge(u, v, obj={}) {
      vertices[u].outVertices[v] = obj;
      vertices[v].inVertices[u] = obj;
      numEdges++;
    }

    addChild(u, v) {
      vertices[u].children.add(u);
      vertices[v].parents.add(v);
    }

    removeVertex(u) {
      for (let v of this.outVertices(u)) {
        this.removeEdge(u, v);
      }
      for (let v of this.inVertices(u)) {
        this.removeEdge(v, u);
      }
      delete vertices[u];
      numVertices--;
    }

    removeEdge(u, v) {
      delete vertices[u].outVertices[v];
      delete vertices[v].inVertices[u];
      numEdges--;
    }

    toString() {
      const obj = {
        vertices: this.vertices().map(u => ({u, d: this.vertex(u)})),
        edges: this.edges().map(([u, v]) => ({u, v, d: this.edge(u, v)}))
      };
      return JSON.stringify(obj);
    }
  }

  return new Graph();
};

export default graph;
