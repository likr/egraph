'use strict';

const d3 = require('d3'),
      graph = require('../../lib/graph'),
      renderer = require('./renderer');

const createGraph = () => {
  const g = graph();
  const a1 = g.addVertex();
  const a2 = g.addVertex();
  const a3 = g.addVertex();
  const b1 = g.addVertex();
  const b2 = g.addVertex();
  const b3 = g.addVertex();
  const c1 = g.addVertex();
  const c2 = g.addVertex();
  const c3 = g.addVertex();
  const d1 = g.addVertex();
  const d2 = g.addVertex();
  const d3 = g.addVertex();
  g.addEdge(a1, b2);
  g.addEdge(a2, b1);
  g.addEdge(a3, b1);
  g.addEdge(b1, c1);
  g.addEdge(b2, c1);
  g.addEdge(b2, c2);
  g.addEdge(b2, c3);
  g.addEdge(b3, c2);
  g.addEdge(c1, d3);
  g.addEdge(c2, d1);
  g.addEdge(c2, d2);
  return g;
};

d3.select('#screen')
  .attr({
    width: 1000,
    height: 1000
  })
  .datum(createGraph())
  .transition()
  .call(renderer());
