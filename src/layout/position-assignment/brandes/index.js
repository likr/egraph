'use strict';

const markConflicts = require('./mark-conflicts'),
      verticalAlignment = require('./vertical-alignment'),
      horizontalCompaction = require('./horizontal-compaction');

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

module.exports = brandes;
