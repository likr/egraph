'use strict';

import expect from 'expect.js';
import Renderer from '../../src/renderer';
import Transformer from '../../src/transformer/identity';
import Layouter from '../../src/layouter/sugiyama';
import VertexRenderer from '../../src/renderer/vertex-renderer/circle-vertex-renderer';
import EdgeRenderer from '../../src/renderer/edge-renderer/straight-edge-renderer';

describe('Renderer', () => {
  describe('transformer()', () => {
    it('returns current transformer instance', () => {
      const renderer = new Renderer();
      expect(renderer.transformer()).to.have.property('transform');
    });
  });

  describe('transformer(transformer)', () => {
    it('sets transformer and returns self', () => {
      const renderer = new Renderer(),
            transformer = new Transformer();
      expect(renderer.transformer(transformer)).to.be(renderer);
      expect(renderer.transformer()).to.be(transformer);
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
            layouter = new Layouter();
      expect(renderer.layouter(layouter)).to.be(renderer);
      expect(renderer.layouter()).to.be(layouter);
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
