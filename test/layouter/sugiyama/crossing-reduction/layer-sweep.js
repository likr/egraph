'use strict';

import expect from 'expect.js';
import Graph from '../../../../src/graph';
import LayerSweep from '../../../../src/layouter/sugiyama/crossing-reduction/layer-sweep';

describe('LayerSweep', () => {
  describe('call(g, layers)', () => {
    it('sorts layers to minimize number of crossing', () => {
      const graph = new Graph();
      const a1 = graph.addVertex();
      const a2 = graph.addVertex();
      const a3 = graph.addVertex();
      const b1 = graph.addVertex();
      const b2 = graph.addVertex();
      const b3 = graph.addVertex();
      const c1 = graph.addVertex();
      const c2 = graph.addVertex();
      const c3 = graph.addVertex();
      const d1 = graph.addVertex();
      const d2 = graph.addVertex();
      const d3 = graph.addVertex();
      graph.addEdge(a1, b2);
      graph.addEdge(a2, b1);
      graph.addEdge(a3, b1);
      graph.addEdge(b1, c1);
      graph.addEdge(b2, c1);
      graph.addEdge(b2, c2);
      graph.addEdge(b2, c3);
      graph.addEdge(b3, c2);
      graph.addEdge(c1, d3);
      graph.addEdge(c2, d1);
      graph.addEdge(c2, d2);
      const layers = [
        [a1, a2, a3],
        [b1, b2, b3],
        [c1, c2, c3],
        [d1, d2, d3]
      ];
      new LayerSweep().call(graph, layers);
      expect(layers).to.be.eql([
        [a2, a3, a1],
        [b1, b2, b3],
        [c1, c3, c2],
        [d3, d1, d2]
      ]);
    });
  });

  describe('repeat()', () => {
    it('returns current repeat number', () => {
      const layerSweep = new LayerSweep();
      expect(layerSweep.repeat()).to.be.a('number');
    });
  });

  describe('repeat(value)', () => {
    it('sets repeat value and returns self', () => {
      const layerSweep = new LayerSweep();
      expect(layerSweep.repeat(100)).to.be(layerSweep);
      expect(layerSweep.repeat()).to.be(100);
    });
  });

  describe('method()', () => {
    it('returns current method function', () => {
      const layerSweep = new LayerSweep();
      expect(layerSweep.method()).to.be.a('function');
    });
  });

  describe('method(value)', () => {
    it('sets method function and returns self', () => {
      const layerSweep = new LayerSweep(),
            f = (g, layers) => {};
      expect(layerSweep.method(f)).to.be(layerSweep);
      expect(layerSweep.method()).to.be(f);
    });
  });
});
