'use strict';

const d3 = require('d3'),
      graph = require('../../lib/graph'),
      renderer = require('./renderer');

d3.json('data/graph2.json', (data) => {
  const g = graph();
  for (const node of data.nodes) {
    g.addVertex(node);
  }
  for (const link of data.links) {
    g.addEdge(link.source, link.target);
  }

  d3.select('#screen')
    .attr({
      width: 1000,
      height: 1000
    })
    .datum(g)
    .transition()
    .duration(1000)
    .call(renderer({
      vertexWidth: () => 10,
      vertexHeight: () => 10
    }));
});
