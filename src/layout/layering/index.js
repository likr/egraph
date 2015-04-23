'use strict';

module.exports = function layering(g) {
  var layers = {},
      queue = [];
  for (let u of g.vertices()) {
    if (g.inDegree(u) === 0) {
      layers[u] = 0;
      queue.push(u);
    }
  }
  while (queue.length > 0) {
    let u = queue.shift();
    for (let v of g.outVertices(u)) {
      if (layers[v] === undefined) {
        layers[v] = layers[u] + 1;
        queue.push(v);
      } else if (layers[v] < layers[u] + 1) {
        layers[v] = layers[u] + 1;
      }
    }
  }
  return layers;
};
