'use strict';

import expect from 'expect.js';
import CircleVertexRenderer from '../../../src/renderer/vertex-renderer/circle-vertex-renderer';

describe('CircleVertexRenderer', () => {
  describe('vertexColor()', () => {
    it('returns current vertexColor function', () => {
      const renderer = new CircleVertexRenderer();
      expect(renderer.vertexColor()).to.be.a('function');
    });
  });

  describe('vertexColor(f)', () => {
    it('sets vertexColor function and returns self', () => {
      const renderer = new CircleVertexRenderer(),
            f = () => 'black';
      expect(renderer.vertexColor(f)).to.be(renderer);
      expect(renderer.vertexColor()).to.be(f);
    });
  });

  describe('r()', () => {
    it('returns current r value', () => {
      const renderer = new CircleVertexRenderer();
      expect(renderer.r()).to.be.a('number');
    });
  });

  describe('r(value)', () => {
    it('sets r value and returns self', () => {
      const renderer = new CircleVertexRenderer();
      expect(renderer.r(5)).to.be(renderer);
      expect(renderer.r()).to.be(5);
    });
  });
});
