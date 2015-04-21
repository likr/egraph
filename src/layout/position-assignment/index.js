'use strict';

const priority = require('./priority');

const initLayer = (g, h, positions, sizes, xMargin) => {
  let offset = 0;
  for (const u of h) {
    positions[u] = {
      x: offset + sizes[u].width / 2
    };
    offset += sizes[u].width + xMargin;
  }
};

const maxWidthLayer = (g, layers, positions) => {
  let widthMax = 0,
      widthMaxLayer;
  for (let i = 0; i < layers.length; ++i) {
    const layer = layers[i],
          width = positions[layer[layer.length - 1]].x - positions[layer[0]].x;
    if (width > widthMax) {
      widthMax = width;
      widthMaxLayer = i;
    }
  }
  return widthMaxLayer;
};

const positionAssignment = (g, layers, sizes, xMargin, yMargin, edgeMargin) => {
  const n = layers.length,
        normalizedSizes = {},
        positions = {};
  for (const layer of layers) {
    initLayer(g, layer, positions, sizes, xMargin);
    for (const u of layer) {
      if (g.vertex(u).dummy) {
        normalizedSizes[u] = {
          width: sizes[u].width + edgeMargin,
          height: sizes[u].height + yMargin
        };
      } else {
        normalizedSizes[u] = {
          width: sizes[u].width + xMargin,
          height: sizes[u].height + yMargin
        };
      }
    }
  }

  const j = maxWidthLayer(g, layers, positions);
  for (let i = j + 1; i < n; ++i) {
    priority(g, layers[i - 1], layers[i], positions, normalizedSizes);
  }
  for (let i = j; i > 0; --i) {
    priority(g, layers[i - 1], layers[i], positions, normalizedSizes, true);
  }

  let yOffset = 0;
  for (let i = 0; i < n; ++i) {
    let maxHeight = 0;
    for (let u of layers[i]) {
      maxHeight = Math.max(maxHeight, normalizedSizes[u].height);
    }
    yOffset += maxHeight / 2;
    for (let u of layers[i]) {
      positions[u].y = yOffset;
    }
    yOffset += maxHeight / 2;
  }
  return positions;
};

module.exports = positionAssignment;
