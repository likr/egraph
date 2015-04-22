'use strict';

const markConflicts = require('./mark-conflicts'),
      verticalAlignment = require('./vertical-alignment'),
      horizontalCompaction = require('./horizontal-compaction');

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

  for (const direction of directions) {
    verticalAlignment(g, layers, direction);
    horizontalCompaction(g, layers, direction);
    let minX = Infinity;
    for (const u of g.vertices()) {
      if (direction.rtol) {
        g.vertex(u).x = -g.vertex(u).x;
      }
      minX = Math.min(minX, g.vertex(u).x);
    }
    for (const u of g.vertices()) {
      g.vertex(u).x -= minX;
      xs[u].push(g.vertex(u).x);
    }
  }
  for (const u of g.vertices()) {
    xs[u].sort();
    g.vertex(u).x = (xs[u][1] + xs[u][2]) / 2;
  }
};

module.exports = brandes;
