'use strict';

import expect from 'expect.js';
import StraightEdgeRenderer from '../../../src/renderer/edge-renderer/straight-edge-renderer';

describe('StraightEdgeRenderer', () => {
  describe('edgeColor()', () => {
    it('returns current edgeColor function', () => {
      const renderer = new StraightEdgeRenderer();
      expect(renderer.edgeColor()).to.be.a('function');
    });
  });

  describe('edgeColor(f)', () => {
    it('sets edgeColor and returns self', () => {
      const renderer = new StraightEdgeRenderer(),
            f = () => 'black';
      expect(renderer.edgeColor(f)).to.be(renderer);
      expect(renderer.edgeColor()).to.be(f);
    });
  });

  describe('edgeOpacity()', () => {
    it('returns current edgeOpacity function', () => {
      const renderer = new StraightEdgeRenderer();
      expect(renderer.edgeOpacity()).to.be.a('function');
    });
  });

  describe('edgeOpacity(f)', () => {
    it('sets edgeOpacity and returns self', () => {
      const renderer = new StraightEdgeRenderer(),
            f = () => 1;
      expect(renderer.edgeOpacity(f)).to.be(renderer);
      expect(renderer.edgeOpacity()).to.be(f);
    });
  });
});
