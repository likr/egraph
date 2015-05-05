'use strict';

import expect from 'expect.js';
import Graph from '../src/graph';
import copy from '../src/graph/copy';

describe('Graph', () => {
  describe('constructor', () => {
    it('constructs empty graph', () => {
      const graph = new Graph();
      expect(graph.numVertices()).to.be(0);
      expect(graph.numEdges()).to.be(0);
    });
  });

  describe('addVertex()', () => {
    it('adds vertex with empty object and returns descriptor', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      expect(graph.numVertices()).to.be(1);
      expect(graph.vertex(u)).to.be.eql({});
    });
  });

  describe('addVertex(obj)', () => {
    it('adds vertex with obj and returns descriptor', () => {
      const graph = new Graph();
      const obj = {
        spam: 'ham'
      };
      const u = graph.addVertex(obj);
      expect(graph.numVertices()).to.be(1);
      expect(graph.vertex(u)).to.be(obj);
    });
  });

  describe('addVertex(u, obj)', () => {
    it('adds vertex that has descriptor u with obj and returns u', () => {
      const graph = new Graph();
      const obj = {
        spam: 'ham'
      };
      const u = graph.addVertex(0, obj);
      expect(graph.numVertices()).to.be(1);
      expect(u).to.be(0);
      expect(graph.vertex(u)).to.be(obj);
    });
  });

  describe('addEdge(u, v)', () => {
    it('adds edge from u to v with empty object', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      graph.addEdge(u, v);
      expect(graph.numEdges()).to.be(1);
      expect(graph.edge(u, v)).to.be.eql({});
    });
  });

  describe('addEdge(u, v, obj)', () => {
    it('adds edge from u to v with obj', () => {
      const graph = new Graph();
      const obj = {
        spam: 'ham'
      };
      const u = graph.addVertex();
      const v = graph.addVertex();
      graph.addEdge(u, v, obj);
      expect(graph.numEdges()).to.be(1);
      expect(graph.edge(u, v)).to.be(obj);
    });
  });

  describe('numVertices()', () => {
    it('returns number of vertices', () => {
      const graph = new Graph();
      graph.addVertex();
      graph.addVertex();
      graph.addVertex();
      expect(graph.numVertices()).to.be(3);
    });
  });

  describe('numEdges()', () => {
    it('returns number of edges', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      expect(graph.numEdges()).to.be(3);
    });
  });

  describe('vertices()', () => {
    it('returns generator of vertex descriptors', () => {
      const graph = new Graph();
      const objs = {
        0: {spam: 'spam'},
        1: {ham: 'ham'},
        2: {egg: 'egg'}
      };
      for (let i = 0; i < objs.length; ++i) {
        graph.addVertex(i, objs[i]);
      }
      let count = 0;
      for (const u of graph.vertices()) {
        expect(graph.vertex(u)).to.be(objs[u]);
        count++;
      }
      expect(count).to.be(graph.numVertices());
    });
  });

  describe('edges()', () => {
    it('returns generator of edge descriptors', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      const objs = {
        [u]: {
          [v]: {spam: 'spam'},
          [w]: {ham: 'ham'}
        },
        [v]: {
          [w]: {egg: 'egg'}
        }
      };
      graph.addEdge(u, v, objs[u][v]);
      let count = 0;
      for (const [u, v] of graph.edges()) {
        expect(graph.edge(u, v)).to.be(objs[u][v]);
        count++;
      }
      expect(count).to.be(graph.numEdges());
    });
  });

  describe('outVertices(u)', () => {
    it('returns generator of out vertices from u', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      const outVertices = new Set([v, w]);
      let count = 0;
      for (const v of graph.outVertices(u)) {
        expect(outVertices.has(v)).to.be.ok();
        count++;
      }
      expect(count).to.be(graph.outDegree(u));
    });
  });

  describe('inVertices(u)', () => {
    it('returns generator of in vertices to u', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      const inVertices = new Set([u, v]);
      let count = 0;
      for (const v of graph.inVertices(w)) {
        expect(inVertices.has(v)).to.be.ok();
        count++;
      }
      expect(count).to.be(graph.inDegree(w));
    });
  });

  describe('outEdges(u)', () => {
    it('returns generator of out edges from u', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      const outVertices = new Set([v, w]);
      let count = 0;
      for (const [v, w] of graph.outEdges(u)) {
        expect(v).to.be(u);
        expect(outVertices.has(w)).to.be.ok();
        count++;
      }
      expect(count).to.be(graph.outDegree(u));
    });
  });

  describe('inEdges(u)', () => {
    it('returns generator of in vertices to u', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      const inVertices = new Set([u, v]);
      let count = 0;
      for (const [u, v] of graph.inEdges(w)) {
        expect(v).to.be(w);
        expect(inVertices.has(u)).to.be.ok();
        count++;
      }
      expect(count).to.be(graph.inDegree(w));
    });
  });

  describe('toString()', () => {
    it('returns string representation of the graph', () => {
      const graph = new Graph();
      const u = graph.addVertex();
      const v = graph.addVertex();
      const w = graph.addVertex();
      graph.addEdge(u, v);
      graph.addEdge(u, w);
      graph.addEdge(v, w);
      expect(graph.toString()).to.be('{"vertices":[{"u":0,"d":{}},{"u":1,"d":{}},{"u":2,"d":{}}],"edges":[{"u":0,"v":1,"d":{}},{"u":0,"v":2,"d":{}},{"u":1,"v":2,"d":{}}]}');
    });
  });
});

describe('copy', () => {
  it('returns copied graph', () => {
    const graph = new Graph();
    const u = graph.addVertex();
    const v = graph.addVertex();
    const w = graph.addVertex();
    graph.addEdge(u, v);
    graph.addEdge(u, w);
    graph.addEdge(v, w);
    const newGraph = copy(graph);
    expect(newGraph.numVertices()).to.be(graph.numVertices());
    expect(newGraph.numEdges()).to.be(graph.numEdges());
  });
});
