'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import ImaiTreeLayouter from '../../src/layouter/imai-tree';

describe('ImaiTreeLayouter', () => {
  describe('layout(g)', () => {
    it('returns positions of vertices', () => {
      const [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12, u13, u14, u15] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      const graph = new Graph()
        .addVertex(u1)
        .addVertex(u2)
        .addVertex(u3)
        .addVertex(u4)
        .addVertex(u5)
        .addVertex(u6)
        .addVertex(u7)
        .addVertex(u8)
        .addVertex(u9)
        .addVertex(u10)
        .addVertex(u11)
        .addVertex(u12)
        .addVertex(u13)
        .addVertex(u14)
        .addVertex(u15)
        .addEdge(u1, u2)
        .addEdge(u1, u3)
        .addEdge(u2, u4)
        .addEdge(u3, u5)
        .addEdge(u5, u6)
        .addEdge(u5, u7)
        .addEdge(u6, u8)
        .addEdge(u7, u9)
        .addEdge(u9, u10)
        .addEdge(u9, u11)
        .addEdge(u7, u12)
        .addEdge(u5, u13)
        .addEdge(u6, u14)
        .addEdge(u6, u15);
      const result = new ImaiTreeLayouter().layout(graph);
      expect(result).to.have.property('vertices');
      expect(result).to.have.property('edges');
    });
  });
});
