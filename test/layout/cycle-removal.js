'use strict';
var expect = require('expect.js'),
    graph = require('../../src/graph'),
    cycleRemoval = require('../../src/layout/cycle-removal'),
    cycleEdges = require('../../src/layout/cycle-removal/cycle-edges');

describe('cycleEdges(g)', () => {
  it('returns cycle edges of g', () => {
    var g = graph();
    var a = g.addVertex();
    var b = g.addVertex();
    var c = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(c, a);
    var edges = cycleEdges(g);
    expect(edges.length).to.be(1);
    expect(edges[0][0]).to.be(c);
    expect(edges[0][1]).to.be(a);
  });
});

describe('cycleRemoval(g)', () => {
  it('replace cycle edges with the inverse edges', () => {
    var g = graph();
    var a = g.addVertex();
    var b = g.addVertex();
    var c = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(c, a);
    cycleRemoval(g);
    expect(g.edge(a, c)).to.be.ok();
  });
});
