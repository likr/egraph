'use strict';

module.exports = function cross(g, h1, h2) {
  var count = 0,
      n1 = h1.length,
      n2 = h2.length;
  for (var i = 0; i < n2; ++i) {
    let v1 = h2[i];
    for (var j = i + 1; j < n2; ++j) {
      let v2 = h2[j];
      for (var k = 0; k < n1; ++k) {
        let u1 = h1[k];
        if (g.edge(u1, v1)) {
          for (var l = 0; l < k; ++l) {
            let u2 = h1[l];
            if (g.edge(u2, v2)) {
              count += 1;
            }
          }
        }
      }
    }
  }
  return count;
};
