'use strict';

const priority = require('./priority');

const initLayer = (g, h, positions, sizes) => {
  let offset = 0;
  for (const u of h) {
    positions[u] = {
      x: offset + sizes[u].width / 2
    };
    offset += sizes[u].width;
  }
};

const positionAssignment = (g, layers, sizes, xMargin, yMargin, edgeMargin) => {
  const n = layers.length,
        normalizedSizes = {},
        positions = {};
  for (const layer of layers) {
    initLayer(g, layer, positions, sizes);
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

  for (let i = 1; i < n; ++i) {
    priority(g, layers[i - 1], layers[i], positions, normalizedSizes);
  }
  for (let i = n - 1; i > 0; --i) {
    priority(g, layers[i - 1], layers[i], positions, normalizedSizes, true);
  }
  for (let i = 1; i < n; ++i) {
    priority(g, layers[i - 1], layers[i], positions, normalizedSizes);
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
