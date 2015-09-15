import Immutable from "immutable";
import AbstractGraph from "./abstract-graph";

const privates = new WeakMap();

const p = (self) => privates.get(self);

class ImmutableGraph extends AbstractGraph {
  constructor() {
    super();
    privates.set(this, {
      vertices: new Immutable.Map(),
      numVertices: 0,
      numEdges: 0
    });
  }

  vertex(u) {
    const vertices = p(this).vertices;
    if (vertices.get(u)) {
      return vertices.get(u).get("data");
    }
    return null;
  }

  edge(u, v) {
    const vertices = p(this).vertices;
    if (vertices.get(u) && vertices.get(u).get("outVertices").get(v)) {
      return vertices.get(u).get("outVertices").get(v);
    }
    return null;
  }

  vertices() {
    return Array.from(p(this).vertices.keys());
  }

  outVertices(u) {
    if (this.vertex(u) === null) {
      throw new Error(`Invalid vertex: ${u}`);
    }
    return Array.from(p(this).vertices.get(u).get("outVertices").keys());
  }

  inVertices(u) {
    if (this.vertex(u) === null) {
      throw new Error(`Invalid vertex: ${u}`);
    }
    return Array.from(p(this).vertices.get(u).get("inVertices").keys());
  }

  numVertices() {
    return p(this).numVertices;
  }

  numEdges() {
    return p(this).numEdges;
  }

  outDegree(u) {
    return p(this).vertices.get(u).get("outVertices").size;
  }

  inDegree(u) {
    return p(this).vertices.get(u).get("inVertices").size;
  }

  addVertex(u, d={}) {
    if (this.vertex(u)) {
      throw new Error(`Duplicated vertex: ${u}`);
    }
    const graph = new ImmutableGraph();
    privates.set(graph, {
      numVertices: p(this).numVertices + 1,
      numEdges: p(this).numEdges,
      vertices: p(this).vertices.set(u, new Immutable.Map({
        outVertices: new Immutable.Map(),
        inVertices: new Immutable.Map(),
        data: d
      }))
    });
    return graph;
  }

  addEdge(u, v, obj={}) {
    if (this.vertex(u) === null) {
      throw new Error(`Invalid vertex: ${u}`);
    }
    if (this.vertex(v) === null) {
      throw new Error(`Invalid vertex: ${v}`);
    }
    if (this.edge(u, v)) {
      throw new Error(`Duplicated edge: (${u}, ${v})`);
    }
    const graph = new ImmutableGraph();
    privates.set(graph, {
      numVertices: p(this).numVertices,
      numEdges: p(this).numEdges + 1,
      vertices: p(this).vertices.withMutations((vertices) => {
        vertices
          .set(u, vertices.get(u).set("outVertices", vertices.get(u).get("outVertices").set(v, obj)))
          .set(v, vertices.get(v).set("inVertices", vertices.get(v).get("inVertices").set(u, obj)));
      })
    });
    return graph;
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
}

export default ImmutableGraph;
