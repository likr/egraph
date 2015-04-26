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
      transform: 'scale(0.3)',
      width: 10000,
      height: 10000
    })
    .datum(g)
    .transition()
    .duration(1000)
    .delay(1000)
    .call(renderer({
      vertexWidth: ({d}) => Math.min(d.text.length, 20) * 8,
      vertexHeight: () => 12,
      vertexColor: ({d}) => d.color || '#ccc',
      xMargin: 30,
      yMargin: 3,
      edgeMargin: 3,
      ltor: true
    }));
});
