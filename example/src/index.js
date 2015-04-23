'use strict';

const d3 = require('d3'),
      graph = require('../../lib/graph'),
      renderer = require('./renderer');

d3.json('data/graph5.json', (data) => {
  const g = graph();
  for (const node of data.nodes) {
    g.addVertex(node);
  }
  for (const link of data.links) {
    if (link.source !== link.target) {
      g.addEdge(link.source, link.target);
    }
  }

  d3.select('#screen')
    .attr({
      width: 1000,
      height: 1000
    })
    .datum(g)
    .transition()
    .duration(1000)
    .delay(2000)
    .call(renderer({
      vertexWidth: () => 4,
      vertexHeight: () => 5,
      xMargin: 2,
      yMargin: 10,
      edgeMargin: 1,
      ltor: true
    }));
});
