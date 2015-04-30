'use strict';

import expect from 'expect.js';
import graph from '../src/graph';
import copy from '../src/graph/copy';

describe('graph', () => {
  it('returns empty Graph', () => {
    var g = graph();
    expect(g.numVertices()).to.be(0);
    expect(g.numEdges()).to.be(0);
  });
});

describe('Graph', () => {
  describe('addVertex()', () => {
    it('adds vertex with empty object and returns descriptor', () => {
      var g = graph();
      var u = g.addVertex();
      expect(g.numVertices()).to.be(1);
      expect(g.vertex(u)).to.be.eql({});
    });
  });

  describe('addVertex(obj)', () => {
    it('adds vertex with obj and returns descriptor', () => {
      var g = graph();
      var obj = {
        spam: 'ham'
      };
      var u = g.addVertex(obj);
      expect(g.numVertices()).to.be(1);
      expect(g.vertex(u)).to.be(obj);
    });
  });

  describe('addVertex(u, obj)', () => {
    it('adds vertex that has descriptor u with obj and returns u', () => {
      var g = graph();
      var obj = {
        spam: 'ham'
      };
      var u = g.addVertex(0, obj);
      expect(g.numVertices()).to.be(1);
      expect(u).to.be(0);
      expect(g.vertex(u)).to.be(obj);
    });
  });

  describe('addEdge(u, v)', () => {
    it('adds edge from u to v with empty object', () => {
      var g = graph();
      var u = g.addVertex();
      var v = g.addVertex();
      g.addEdge(u, v);
      expect(g.numEdges()).to.be(1);
      expect(g.edge(u, v)).to.be.eql({});
    });
  });

  describe('addEdge(u, v, obj)', () => {
    it('adds edge from u to v with obj', () => {
      var g = graph();
      var obj = {
        spam: 'ham'
      };
      var u = g.addVertex();
      var v = g.addVertex();
      g.addEdge(u, v, obj);
      expect(g.numEdges()).to.be(1);
      expect(g.edge(u, v)).to.be(obj);
    });
  });

  describe('numVertices()', () => {
    it('returns number of vertices', () => {
      var g = graph();
      g.addVertex();
      g.addVertex();
      g.addVertex();
      expect(g.numVertices()).to.be(3);
    });
  });

  describe('numEdges()', () => {
    it('returns number of edges', () => {
      var g = graph();
      var u = g.addVertex();
      var v = g.addVertex();
      var w = g.addVertex();
      g.addEdge(u, v);
      g.addEdge(u, w);
      g.addEdge(v, w);
      expect(g.numEdges()).to.be(3);
    });
  });

  describe('vertices()', () => {
    it('returns generator of vertex descriptors', () => {
      var g = graph();
      var objs = {
        0: {spam: 'spam'},
        1: {ham: 'ham'},
        2: {egg: 'egg'}
      };
      for (let i = 0; i < objs.length; ++i) {
        g.addVertex(i, objs[i]);
      }
      var count = 0;
      for (let u of g.vertices()) {
        expect(g.vertex(u)).to.be(objs[u]);
        count++;
      }
      expect(count).to.be(g.numVertices());
    });
  });

  describe('edges()', () => {
    it('returns generator of edge descriptors', () => {
      var g = graph();
      var u = g.addVertex();
      var v = g.addVertex();
      var w = g.addVertex();
      var objs = {
        [u]: {
          [v]: {spam: 'spam'},
          [w]: {ham: 'ham'}
        },
        [v]: {
          [w]: {egg: 'egg'}
        }
      };
      g.addEdge(u, v, objs[u][v]);
      var count = 0;
      for (let [u, v] of g.edges()) {
        expect(g.edge(u, v)).to.be(objs[u][v]);
        count++;
      }
      expect(count).to.be(g.numEdges());
    });
  });

  describe('outVertices(u)', () => {
    it('returns generator of out vertices from u', () => {
      var g = graph();
      var u = g.addVertex();
      var v = g.addVertex();
      var w = g.addVertex();
      g.addEdge(u, v);
      g.addEdge(u, w);
      g.addEdge(v, w);
      var outVertices = new Set([v, w]);
      var count = 0;
      for (let v of g.outVertices(u)) {
        expect(outVertices.has(v)).to.be.ok();
        count++;
      }
      expect(count).to.be(g.outDegree(u));
    });
  });

  describe('inVertices(u)', () => {
    it('returns generator of in vertices to u', () => {
      var g = graph();
      var u = g.addVertex();
      var v = g.addVertex();
      var w = g.addVertex();
      g.addEdge(u, v);
      g.addEdge(u, w);
      g.addEdge(v, w);
      var inVertices = new Set([u, v]);
      var count = 0;
      for (let v of g.inVertices(w)) {
        expect(inVertices.has(v)).to.be.ok();
        count++;
      }
      expect(count).to.be(g.inDegree(w));
    });
  });

  describe('outEdges(u)', () => {
    it('returns generator of out edges from u', () => {
      const g = graph();
      const u = g.addVertex();
      const v = g.addVertex();
      const w = g.addVertex();
      g.addEdge(u, v);
      g.addEdge(u, w);
      g.addEdge(v, w);
      const outVertices = new Set([v, w]);
      let count = 0;
      for (const [v, w] of g.outEdges(u)) {
        expect(v).to.be(u);
        expect(outVertices.has(w)).to.be.ok();
        count++;
      }
      expect(count).to.be(g.outDegree(u));
    });
  });

  describe('inEdges(u)', () => {
    it('returns generator of in vertices to u', () => {
      const g = graph();
      const u = g.addVertex();
      const v = g.addVertex();
      const w = g.addVertex();
      g.addEdge(u, v);
      g.addEdge(u, w);
      g.addEdge(v, w);
      const inVertices = new Set([u, v]);
      let count = 0;
      for (const [u, v] of g.inEdges(w)) {
        expect(v).to.be(w);
        expect(inVertices.has(u)).to.be.ok();
        count++;
      }
      expect(count).to.be(g.inDegree(w));
    });
  });
});

describe('copy', () => {
  it('returns copied graph', () => {
    const g = graph();
    const u = g.addVertex();
    const v = g.addVertex();
    const w = g.addVertex();
    g.addEdge(u, v);
    g.addEdge(u, w);
    g.addEdge(v, w);
    const newGraph = copy(g);
    expect(newGraph.numVertices()).to.be(g.numVertices());
    expect(newGraph.numEdges()).to.be(g.numEdges());
  });
});
