'use strict';

const d3 = require('d3'),
      graph = require('../../lib/graph'),
      renderer = require('./renderer');

const createGraph = () => {
  const g = graph();
  const a1 = g.addVertex({color: '#f00'});
  const a2 = g.addVertex({color: '#0f0'});
  const a3 = g.addVertex({color: '#00f'});
  const b1 = g.addVertex({color: '#f00'});
  const b2 = g.addVertex({color: '#0f0'});
  const b3 = g.addVertex({color: '#00f'});
  const c1 = g.addVertex({color: '#f00'});
  const c2 = g.addVertex({color: '#0f0'});
  const c3 = g.addVertex({color: '#00f'});
  const d1 = g.addVertex({color: '#f00'});
  const d2 = g.addVertex({color: '#0f0'});
  const d3 = g.addVertex({color: '#00f'});
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

const g = createGraph();

d3.select('#screen')
  .attr({
    width: 1000,
    height: 1000
  })
  .datum(g)
  .transition()
  .duration(1000)
  .call(renderer());

setTimeout(() => {
  g.addEdge(0, 6);
  g.addEdge(0, 9);
  g.addEdge(0, 10);
  g.addEdge(0, 11);
  g.removeVertex(8);
  d3.select('#screen')
    .transition()
    .duration(1500)
    .call(renderer());
}, 2000);
