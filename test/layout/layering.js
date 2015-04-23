'use strict';
var expect = require('expect.js'),
    graph = require('../../lib/graph'),
    layering = require('../../lib/layout/layering');

describe('layering(g)', () => {
  it('returns layers', () => {
    var g = graph();
    var a = g.addVertex();
    var b = g.addVertex();
    var c = g.addVertex();
    var d = g.addVertex();
    var e = g.addVertex();
    g.addEdge(a, b);
    g.addEdge(b, c);
    g.addEdge(d, c);
    g.addEdge(d, e);
    var layers = layering(g);
    expect(layers[a]).to.be(0);
    expect(layers[b]).to.be(1);
    expect(layers[c]).to.be(2);
    expect(layers[d]).to.be(1);
    expect(layers[e]).to.be(2);
  });
});
