'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import QuadHeuristic from '../../../../src/layouter/sugiyama/layer-assignment/quad-heuristic';

describe('QuadHeuristic', () => {
  describe('call(graph)', () => {
    it('returns layers', () => {
      const graph = new Graph();
      const a = graph.addVertex();
      const b = graph.addVertex();
      const c = graph.addVertex();
      const d = graph.addVertex();
      const e = graph.addVertex();
      const f = graph.addVertex();
      const g = graph.addVertex();
      const h = graph.addVertex();
      graph.addEdge(a, b);
      graph.addEdge(b, c);
      graph.addEdge(c, d);
      graph.addEdge(d, e);
      graph.addEdge(f, g);
      graph.addEdge(g, h);
      expect(new QuadHeuristic().call(graph)).to.be.eql({
        [a]: 0,
        [b]: 1,
        [c]: 2,
        [d]: 3,
        [e]: 4,
        [f]: 0,
        [g]: 2,
        [h]: 4
      });
    });
  });

  describe('repeat()', () => {
    it('returns current repeat number', () => {
      const qh = new QuadHeuristic();
      expect(qh.repeat()).to.be.a('number');
    });
  });

  describe('repeat(val)', () => {
    it('sets repeat number and returns self', () => {
      const qh = new QuadHeuristic();
      expect(qh.repeat(8)).to.be(qh);
      expect(qh.repeat()).to.be(8);
    });
  });
});
