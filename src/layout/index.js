'use strict';

const graph = require('../graph'),
      cycleRemoval = require('./cycle-removal'),
      layerAssignment = require('./layer-assignment'),
      normalize = require('./normalize'),
      crossingReduction = require('./crossing-reduction'),
      positionAssignment = require('./position-assignment');

const initGraph = (gOrig, {width, height, xMargin, yMargin}) => {
  const g = graph();
  for (const u of gOrig.vertices()) {
    const uNode = gOrig.vertex(u),
          w = width({u, d: uNode}),
          h = height({u, d: uNode});
    g.addVertex(u, {
      width: w + xMargin,
      height: h + yMargin,
      origHeight: h
    });
  }
  for (const [u, v] of gOrig.edges()) {
    g.addEdge(u, v);
  }
  return g;
};

const buildResult = (g, layers) => {
  const result = {
          vertices: {},
          edges: {}
        },
        layerHeights = [];

  for (const layer of layers) {
    let maxHeight = -Infinity;
    for (const u of layer) {
      maxHeight = Math.max(maxHeight, g.vertex(u).origHeight || 0);
    }
    layerHeights.push(maxHeight);
  }

  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i],
          layerHeight = layerHeights[i];
    for (const u of layer) {
      const uNode = g.vertex(u);
      if (!uNode.dummy) {
        result.vertices[u] = {
          x: uNode.x,
          y: uNode.y,
          layer: uNode.layer,
          order: uNode.order
        };

        if (result.edges[u] === undefined) {
          result.edges[u] = {};
        }

        for (const v of g.outVertices(u)) {
          const points = [[uNode.x, uNode.y + (uNode.origHeight || 0) / 2], [uNode.x, uNode.y + layerHeight / 2]];
          let w = v,
              wNode = g.vertex(w);
          while (wNode.dummy) {
            points.push([wNode.x, wNode.y - layerHeight / 2]);
            points.push([wNode.x, wNode.y + layerHeight / 2]);
            w = g.outVertices(w)[0];
            wNode = g.vertex(w);
          }
          points.push([wNode.x, wNode.y - layerHeight / 2]);
          points.push([wNode.x, wNode.y - (wNode.origHeight || 0) / 2]);
          result.edges[u][w] = {
            points: points
          };
        }
      }
    }
  }

  return result;
};

const layout = (gOrig, options) => {
  const {edgeMargin} = options;
  const g = initGraph(gOrig, options);
  cycleRemoval(g);
  const layers = layerAssignment(g);
  normalize(g, layers, edgeMargin);
  crossingReduction(g, layers);
  positionAssignment(g, layers);
  return buildResult(g, layers);
};

module.exports = layout;
