'use strict';
var expect = require('expect.js'),
    graph = require('../../lib/graph'),
    priority = require('../../lib/layout/position-assignment/priority');

describe('priority(g, h1, h2, x1, w2)', () => {
  it('returns x2', () => {
    var g = graph();
    var u1 = g.addVertex();
    var u2 = g.addVertex();
    var u3 = g.addVertex();
    var u4 = g.addVertex();
    var u5 = g.addVertex();
    var u6 = g.addVertex();
    var u7 = g.addVertex();
    var u8 = g.addVertex();
    var u9 = g.addVertex();
    var v1 = g.addVertex();
    var v2 = g.addVertex();
    var v3 = g.addVertex();
    var v4 = g.addVertex();
    g.addEdge(u1, v1);
    g.addEdge(u2, v1);
    g.addEdge(u3, v1);
    g.addEdge(u4, v1);
    g.addEdge(u5, v1);
    g.addEdge(u6, v2);
    g.addEdge(u7, v3);
    g.addEdge(u8, v3);
    g.addEdge(u9, v3);
    g.addEdge(u7, v4);
    g.addEdge(u9, v4);
    var h1 = [u1, u2, u3, u4, u5, u6, u7, u8, u9];
    var h2 = [v2, v1, v3, v4];
    var x1 = {
      [u1]: 1,
      [u2]: 2,
      [u3]: 3,
      [u4]: 4,
      [u5]: 5,
      [u6]: 6,
      [u7]: 7,
      [u8]: 8,
      [u9]: 9
    };
    var w2 = {
      [v1]: 1,
      [v2]: 1,
      [v3]: 1,
      [v4]: 1
    };
    var x2 = priority(g, h1, h2, x1, w2);
    expect(x2[v1]).to.be(3);
    expect(x2[v2]).to.be(6);
    expect(x2[v3]).to.be(8);
    expect(x2[v4]).to.be(9);
  });
});
