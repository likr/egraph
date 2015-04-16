'use strict';
var expect = require('expect.js'),
    graph = require('../../lib/graph'),
    normalize = require('../../lib/layout/normalize');

describe('normalize(g, layers)', () => {
  it('normalizes g and layers', () => {
    var g = graph();
    var a = g.addVertex();
    var b = g.addVertex();
    var c = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(a, c);
    var layers = {
      [a]: 0,
      [b]: 1,
      [c]: 2
    };
    normalize(g, layers);
    expect(g.numVertices()).to.be(4);
    expect(g.numEdges()).to.be(4);
    expect(g.vertex(3).dummy).to.be.ok();
    expect(g.edge(a, 3).dummy).to.be.ok();
    expect(g.edge(3, c).dummy).to.be.ok();
  });
});
