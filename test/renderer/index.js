'use strict';

import expect from 'expect.js';
import Renderer from '../../src/renderer';
import layouter from '../../src/layouter';
import VertexRenderer from '../../src/renderer/vertex-renderer/circle-vertex-renderer';
import EdgeRenderer from '../../src/renderer/edge-renderer/straight-edge-renderer';

describe('Renderer', () => {
  describe('vertexVisibility()', () => {
    it('returns current vertexVisibility function', () => {
      const renderer = new Renderer();
      expect(renderer.vertexVisibility()).to.be.a('function');
    });
  });

  describe('vertexVisibility(f)', () => {
    it('sets vertexVisibility and returns self', () => {
      const renderer = new Renderer(),
            f = () => true;
      expect(renderer.vertexVisibility(f)).to.be(renderer);
      expect(renderer.vertexVisibility()).to.be(f);
    });
  });

  describe('edgeVisibility()', () => {
    it('returns current edgeVisibility function', () => {
      const renderer = new Renderer();
      expect(renderer.edgeVisibility()).to.be.a('function');
    });
  });

  describe('edgeVisibility(f)', () => {
    it('sets edgeVisibility and returns self', () => {
      const renderer = new Renderer(),
            f = () => true;
      expect(renderer.edgeVisibility(f)).to.be(renderer);
      expect(renderer.edgeVisibility()).to.be(f);
    });
  });

  describe('layouter()', () => {
    it('returns current layouter instance', () => {
      const renderer = new Renderer();
      expect(renderer.layouter()).to.have.property('layout');
    });
  });

  describe('layouter(layouter)', () => {
    it('sets layouter and returns self', () => {
      const renderer = new Renderer(),
            sugiyamaLayouter = new layouter.SugiyamaLayouter();
      expect(renderer.layouter(sugiyamaLayouter)).to.be(renderer);
      expect(renderer.layouter()).to.be(sugiyamaLayouter);
    });
  });

  describe('vertexRenderer()', () => {
    it('returns current vertexRenderer instance', () => {
      const renderer = new Renderer();
      expect(renderer.vertexRenderer()).to.have.property('render');
    });
  });

  describe('vertexRenderer(vertexRenderer)', () => {
    it('sets vertexRenderer and returns self', () => {
      const renderer = new Renderer(),
            vertexRenderer = new VertexRenderer();
      expect(renderer.vertexRenderer(vertexRenderer)).to.be(renderer);
      expect(renderer.vertexRenderer()).to.be(vertexRenderer);
    });
  });

  describe('edgeRenderer()', () => {
    it('returns current edgeRenderer function', () => {
      const renderer = new Renderer();
      expect(renderer.edgeRenderer()).to.have.property('render');
    });
  });

  describe('edgeRenderer(edgeRenderer)', () => {
    it('sets edgeRenderer and returns self', () => {
      const renderer = new Renderer(),
            edgeRenderer = new EdgeRenderer();
      expect(renderer.edgeRenderer(edgeRenderer)).to.be(renderer);
      expect(renderer.edgeRenderer()).to.be(edgeRenderer);
    });
  });
});
