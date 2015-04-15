'use strict';
var expect = require('expect.js'),
    getGraph = require('../../lib/graph'),
    cross = require('../../lib/layout/crossing-reduction/cross');

describe('cross(g, h1, h2)', () => {
  it('returns the number of crossing', () => {
    let graph = getGraph();
    var a = graph.addVertex();
    var b = graph.addVertex();
    var c = graph.addVertex();
    var d = graph.addVertex();
    var e = graph.addVertex();
    var f = graph.addVertex();
    var g = graph.addVertex();
    graph.addEdge(a, f);
    graph.addEdge(b, f);
    graph.addEdge(b, g);
    graph.addEdge(c, e);
    graph.addEdge(c, g);
    graph.addEdge(d, f);
    expect(cross(graph, [a, b, c, d], [e, f, g])).to.be(5);
  });
});
