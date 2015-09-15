'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import LongestPath from '../../../../src/layouter/sugiyama/layer-assignment/longest-path';

describe('LongestPath', () => {
  describe('call(graph)', () => {
    it('returns layers', () => {
      const [a, b, c, d, e] = [0, 1, 2, 3, 4];
      const graph = new Graph()
        .addVertex(a)
        .addVertex(b)
        .addVertex(c)
        .addVertex(d)
        .addVertex(e)
        .addEdge(a, b)
        .addEdge(b, c)
        .addEdge(d, c)
        .addEdge(d, e);
      expect(new LongestPath().call(graph)).to.be.eql({
        [a]: 0,
        [b]: 1,
        [c]: 2,
        [d]: 1,
        [e]: 2
      });
    });
  });
});
