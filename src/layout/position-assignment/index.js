'use strict';

const priority = require('./priority');

const positionAssignment = (g, layers, sizes, xMargin, yMargin) => {
  const n = Object.keys(layers).length,
        positions = {0: {}};
  let offset = 0;
  for (let u of layers[0]) {
    positions[0][u] = {
      x: offset = offset + sizes[u].width
    };
  }
  for (let i = 1; i < n; ++i) {
    positions[i] = priority(g, layers[i - 1], layers[i], positions[i - 1], sizes, xMargin);
  }
  for (let i = n - 1; i > 0; --i) {
    positions[i] = priority(g, layers[i - 1], layers[i], positions[i - 1], sizes, xMargin, true);
  }
  for (let i = 1; i < n; ++i) {
    positions[i] = priority(g, layers[i - 1], layers[i], positions[i - 1], sizes, xMargin);
  }
  let yOffset = 0;
  for (let i = 0; i < n; ++i) {
    let maxHeight = 0;
    for (let u of layers[i]) {
      maxHeight = Math.max(maxHeight, sizes[u].height);
    }
    yOffset += maxHeight / 2;
    for (let u of layers[i]) {
      positions[i][u].y = yOffset;
    }
    yOffset += maxHeight / 2 + yMargin;
  }
  return positions;
};

module.exports = positionAssignment;
