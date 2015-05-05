'use strict';

import expect from 'expect.js';
import Graph from '../../src/graph';
import ImaiTreeLayouter from '../../src/layouter/imai-tree';

describe('ImaiTreeLayouter', () => {
  describe('layout(g)', () => {
    it('returns positions of vertices', () => {
      const graph = new Graph();
      const u1 = graph.addVertex();
      const u2 = graph.addVertex();
      const u3 = graph.addVertex();
      const u4 = graph.addVertex();
      const u5 = graph.addVertex();
      const u6 = graph.addVertex();
      const u7 = graph.addVertex();
      const u8 = graph.addVertex();
      const u9 = graph.addVertex();
      const u10 = graph.addVertex();
      const u11 = graph.addVertex();
      const u12 = graph.addVertex();
      const u13 = graph.addVertex();
      const u14 = graph.addVertex();
      const u15 = graph.addVertex();
      graph.addEdge(u1, u2);
      graph.addEdge(u1, u3);
      graph.addEdge(u2, u4);
      graph.addEdge(u3, u5);
      graph.addEdge(u5, u6);
      graph.addEdge(u5, u7);
      graph.addEdge(u6, u8);
      graph.addEdge(u7, u9);
      graph.addEdge(u9, u10);
      graph.addEdge(u9, u11);
      graph.addEdge(u7, u12);
      graph.addEdge(u5, u13);
      graph.addEdge(u6, u14);
      graph.addEdge(u6, u15);
      const result = new ImaiTreeLayouter().layout(graph);
      expect(result).to.have.property('vertices');
      expect(result).to.have.property('edges');
    });
  });
});
