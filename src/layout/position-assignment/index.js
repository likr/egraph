'use strict';

const brandes = require('./brandes');

const positionAssignment = (g, layers, sizes, xMargin, yMargin, edgeMargin) => {
  for (const u of g.vertices()) {
    const node = g.vertex(u);
    node.width = sizes[u].width + (node.dummy ? edgeMargin : xMargin);
    node.height = sizes[u].height + yMargin;
  }
  brandes(g, layers);

  let yOffset = 0;
  for (const layer of layers) {
    let maxHeight = 0;
    for (const u of layer) {
      maxHeight = Math.max(maxHeight, g.vertex(u).height);
    }
    yOffset += maxHeight / 2;
    for (const u of layer) {
      g.vertex(u).y = yOffset;
    }
    yOffset += maxHeight / 2;
  }
};

module.exports = positionAssignment;
