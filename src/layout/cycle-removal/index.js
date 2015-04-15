'use strict';
var cycleEdges = require('./cycle-edges');

module.exports = function cycleRemoval(g) {
  for (let [u, v] of cycleEdges(g)) {
    var obj = g.edge(u, v);
    g.removeEdge(u, v);
    g.addEdge(v, u, obj);
  }
};
