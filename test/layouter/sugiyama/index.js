'use strict';

import expect from 'expect.js';
import Graph from '../../../src/graph';
import SugiyamaLayouter from '../../../src/layouter/sugiyama';

describe('SugiyamaLayouter', () => {
  describe('layout(g)', () => {
    it('returns positions of vertices', () => {
      const [a1, a2, a3] = [0, 1, 2],
        [b1, b2, b3] = [3, 4, 5],
        [c1, c2, c3] = [6, 7, 8],
        [d1, d2, d3] = [9, 10, 11];
      const graph = new Graph()
        .addVertex(a1, {width: 1, height: 1})
        .addVertex(a2, {width: 1, height: 1})
        .addVertex(a3, {width: 1, height: 1})
        .addVertex(b1, {width: 1, height: 1})
        .addVertex(b2, {width: 1, height: 1})
        .addVertex(b3, {width: 1, height: 1})
        .addVertex(c1, {width: 1, height: 1})
        .addVertex(c2, {width: 1, height: 1})
        .addVertex(c3, {width: 1, height: 1})
        .addVertex(d1, {width: 1, height: 1})
        .addVertex(d2, {width: 1, height: 1})
        .addVertex(d3, {width: 1, height: 1})
        .addEdge(a1, b2)
        .addEdge(a2, b1)
        .addEdge(a3, b1)
        .addEdge(b1, c1)
        .addEdge(b2, c1)
        .addEdge(b2, c2)
        .addEdge(b2, c3)
        .addEdge(b3, c2)
        .addEdge(c1, d3)
        .addEdge(c2, d1)
        .addEdge(c2, d2);
      const layouter = new SugiyamaLayouter()
              .vertexLeftMargin(() => 2)
              .vertexRightMargin(() => 2)
              .vertexTopMargin(() => 2)
              .vertexBottomMargin(() => 2),
            result = layouter.layout(graph);
      expect(result).to.have.property('vertices');
      expect(result).to.have.property('edges');
    });

    it('should work with self loop graph', () => {
      const a = 0;
      const graph = new Graph()
        .addVertex(a, {width: 1, height: 1})
        .addEdge(a, a);
      const layouter = new SugiyamaLayouter();
      layouter.layout(graph);
    });

    it('should work with multiple edge graph', () => {
      const [a, b] = [0, 1];
      const graph = new Graph()
        .addVertex(a, {width: 1, height: 1})
        .addVertex(b, {width: 1, height: 1})
        .addEdge(a, b)
        .addEdge(b, a);
      const layouter = new SugiyamaLayouter();
      layouter.layout(graph);
    });
  });
});
