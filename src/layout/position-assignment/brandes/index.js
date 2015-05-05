'use strict';

import markConflicts from './mark-conflicts';
import verticalAlignment from './vertical-alignment';
import horizontalCompaction from './horizontal-compaction';

const sort = (xs) => {
  xs.sort((x1, x2) => x1 - x2);
};

const brandes = (g, layers) => {
  markConflicts(g, layers);

  const xs = {};
  for (const u of g.vertices()) {
    xs[u] = [];
  }
  const directions = [
    {rtol: false, btot: false},
    {rtol: true, btot: false},
    {rtol: false, btot: true},
    {rtol: true, btot: true}
  ];

  let minWidthLeft = -Infinity,
      minWidthRight = Infinity;
  for (let i = 0; i < directions.length; ++i) {
    const direction = directions[i];
    verticalAlignment(g, layers, direction);
    horizontalCompaction(g, layers, direction);
    let minX = Infinity,
        maxX = -Infinity;
    for (const u of g.vertices()) {
      if (direction.rtol) {
        g.vertex(u).x = -g.vertex(u).x;
      }
      minX = Math.min(minX, g.vertex(u).x);
      maxX = Math.max(maxX, g.vertex(u).x);
    }
    if (maxX - minX < minWidthRight - minWidthLeft) {
      minWidthLeft = minX;
      minWidthRight = maxX;
    }
    for (const u of g.vertices()) {
      xs[u].push(g.vertex(u).x);
    }
  }
  for (let i = 0; i < directions.length; ++i) {
    const direction = directions[i];
    if (direction.rtol) {
      let maxX = -Infinity;
      for (const u of g.vertices()) {
        maxX = Math.max(maxX, xs[u][i]);
      }
      for (const u of g.vertices()) {
        xs[u][i] += minWidthRight - maxX;
      }
    } else {
      let minX = Infinity;
      for (const u of g.vertices()) {
        minX = Math.min(minX, xs[u][i]);
      }
      for (const u of g.vertices()) {
        xs[u][i] += minWidthLeft - minX;
      }
    }
  }
  for (const u of g.vertices()) {
    sort(xs[u]);
    g.vertex(u).x = (xs[u][1] + xs[u][2]) / 2;
  }
};

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

class Brandes {
  call(g, layers) {
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
  }
}

export default Brandes;
