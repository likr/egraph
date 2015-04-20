'use strict';
const expect = require('expect.js'),
      graph = require('../../lib/graph'),
      layout = require('../../lib/layout');

describe('layout(g, sizes, options)', () => {
  it('returns positions of vertices', () => {
    const g = graph();
    const a1 = g.addVertex();
    const a2 = g.addVertex();
    const a3 = g.addVertex();
    const b1 = g.addVertex();
    const b2 = g.addVertex();
    const b3 = g.addVertex();
    const c1 = g.addVertex();
    const c2 = g.addVertex();
    const c3 = g.addVertex();
    const d1 = g.addVertex();
    const d2 = g.addVertex();
    const d3 = g.addVertex();
    g.addEdge(a1, b2);
    g.addEdge(a2, b1);
    g.addEdge(a3, b1);
    g.addEdge(b1, c1);
    g.addEdge(b2, c1);
    g.addEdge(b2, c2);
    g.addEdge(b2, c3);
    g.addEdge(b3, c2);
    g.addEdge(c1, d3);
    g.addEdge(c2, d1);
    g.addEdge(c2, d2);
    const sizes = {};
    for (const u of g.vertices()) {
      sizes[u] = {
        width: 10,
        height: 10
      };
    }
    const positions = layout(g, sizes, {
      xMargin: 10,
      yMargin: 10
    });
    expect(positions).to.be.eql({
      [a1]: {
        x: 65,
        y: 5
      },
      [a2]: {
        x: 25,
        y: 5
      },
      [a3]: {
        x: 45,
        y: 5
      },
      [b1]: {
        x: 35,
        y: 25
      },
      [b2]: {
        x: 65,
        y: 25
      },
      [b3]: {
        x: 85,
        y: 5
      },
      [c1]: {
        x: 45,
        y: 45
      },
      [c2]: {
        x: 85,
        y: 45
      },
      [c3]: {
        x: 65,
        y: 45
      },
      [d1]: {
        x: 85,
        y: 65
      },
      [d2]: {
        x: 105,
        y: 65
      },
      [d3]: {
        x: 45,
        y: 65
      },
      12: {
        x: 85,
        y: 25
      }
    });
  });
});
