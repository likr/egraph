'use strict';

const cycleEdges = function (g) {
  var stack = {},
      visited = {},
      result = [];

  var dfs = (u) => {
    if (visited[u]) {
      return;
    }
    visited[u] = true;
    stack[u] = true;
    for (let v of g.outVertices(u)) {
      if (stack[v]) {
        result.push([u, v]);
      } else {
        dfs(v);
      }
    }
    delete stack[u];
  };

  for (let u of g.vertices()) {
    dfs(u);
  }

  return result;
};

export default cycleEdges;
