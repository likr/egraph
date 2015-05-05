'use strict';

import expect from 'expect.js';
import TextVertexRenderer from '../../../src/renderer/vertex-renderer/text-vertex-renderer';

describe('TextVertexRenderer', () => {
  describe('vertexColor()', () => {
    it('returns current vertexColor function', () => {
      const renderer = new TextVertexRenderer();
      expect(renderer.vertexColor()).to.be.a('function');
    });
  });

  describe('vertexColor(f)', () => {
    it('sets vertexColor function and returns self', () => {
      const renderer = new TextVertexRenderer(),
            f = () => 'black';
      expect(renderer.vertexColor(f)).to.be(renderer);
      expect(renderer.vertexColor()).to.be(f);
    });
  });

  describe('vertexScale()', () => {
    it('returns current vertexScale function', () => {
      const renderer = new TextVertexRenderer();
      expect(renderer.vertexScale()).to.be.a('function');
    });
  });

  describe('vertexScale(f)', () => {
    it('sets vertexScale function and returns self', () => {
      const renderer = new TextVertexRenderer(),
            f = () => 1;
      expect(renderer.vertexScale(f)).to.be(renderer);
      expect(renderer.vertexScale()).to.be(f);
    });
  });

  describe('vertexText()', () => {
    it('returns current vertexText function', () => {
      const renderer = new TextVertexRenderer();
      expect(renderer.vertexText()).to.be.a('function');
    });
  });

  describe('vertexText(f)', () => {
    it('sets vertexText function and returns self', () => {
      const renderer = new TextVertexRenderer(),
            f = ({d}) => d.text;
      expect(renderer.vertexText(f)).to.be(renderer);
      expect(renderer.vertexText()).to.be(f);
    });
  });
});
