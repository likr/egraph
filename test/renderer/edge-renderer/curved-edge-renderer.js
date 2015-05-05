'use strict';

import expect from 'expect.js';
import CurvedEdgeRenderer from '../../../src/renderer/edge-renderer/curved-edge-renderer';

describe('CurvedEdgeRenderer', () => {
  describe('edgeColor()', () => {
    it('returns current edgeColor function', () => {
      const renderer = new CurvedEdgeRenderer();
      expect(renderer.edgeColor()).to.be.a('function');
    });
  });

  describe('edgeColor(f)', () => {
    it('sets edgeColor and returns self', () => {
      const renderer = new CurvedEdgeRenderer(),
            f = () => 'black';
      expect(renderer.edgeColor(f)).to.be(renderer);
      expect(renderer.edgeColor()).to.be(f);
    });
  });

  describe('edgeOpacity()', () => {
    it('returns current edgeOpacity function', () => {
      const renderer = new CurvedEdgeRenderer();
      expect(renderer.edgeOpacity()).to.be.a('function');
    });
  });

  describe('edgeOpacity(f)', () => {
    it('sets edgeOpacity and returns self', () => {
      const renderer = new CurvedEdgeRenderer(),
            f = () => 1;
      expect(renderer.edgeOpacity(f)).to.be(renderer);
      expect(renderer.edgeOpacity()).to.be(f);
    });
  });

  describe('ltor()', () => {
    it('returns current ltor', () => {
      const renderer = new CurvedEdgeRenderer();
      expect(renderer.ltor()).to.be.a('boolean');
    });
  });

  describe('ltor(flag)', () => {
    it('sets ltor and returns self', () => {
      const renderer = new CurvedEdgeRenderer();
      expect(renderer.ltor(true)).to.be(renderer);
      expect(renderer.ltor()).to.be(true);
    });
  });
});
