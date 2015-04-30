'use strict';

import brandes from './brandes';

const normalize = (g) => {
  let xMin = Infinity,
      yMin = Infinity;
  for (const u of g.vertices()) {
    const uNode = g.vertex(u);
    xMin = Math.min(xMin, uNode.x - uNode.width / 2);
    yMin = Math.min(yMin, uNode.y - uNode.height / 2);
  }
  for (const u of g.vertices()) {
    const uNode = g.vertex(u);
    uNode.x -= xMin;
    uNode.y -= yMin;
  }
};

const positionAssignment = (g, layers) => {
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
  normalize(g);
};

export default positionAssignment;
