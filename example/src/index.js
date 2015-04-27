'use strict';

const d3 = require('d3'),
      graph = require('../../lib/graph'),
      katz = require('../../lib/network/centrality/katz'),
      renderer = require('./renderer');

class Filter {
  constructor(values) {
    const vertices = Object.keys(values);
    this.threshold = 0;
    this.length = vertices.length;
    this.order = {};
    vertices.sort((u, v) => values[u] - values[v]);
    for (let i = 0; i < this.length; ++i) {
      this.order[vertices[i]] = i + 1;
    }
  }

  call(u) {
    return this.order[u] >= this.threshold * this.length;
  }
}

const cutoff = (s, length) => {
  if (s.length <= length) {
    return s;
  }
  return s.substr(0, length - 1) + '...';
};

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

  const filter = new Filter(katz(g));

  const r = renderer({
    vertexColor: ({d}) => d.color || '#ccc',
    vertexText: ({d}) => cutoff(d.text, 10),
    vertexVisibility: ({u}) => filter.call(u),
    xMargin: 200,
    yMargin: 3,
    edgeMargin: 3,
    ltor: true
  });

  const wrapper = d3.select('#screen-wrapper').node(),
        selection = d3.select('#screen');
  selection
    .attr({
      width: wrapper.clientWidth,
      height: wrapper.clientHeight
    })
    .datum(g)
    .transition()
    .duration(1000)
    .delay(1000)
    .call(r);

  d3.select('#threshold').node().value = '0';
  d3.select('#threshold')
    .on('input', function() {
      const threshold = +this.value;
      d3.select('#threshold-value').text(`${((1 - threshold) * 100).toFixed()}%`);
    })
    .on('change', function () {
      const threshold = +this.value,
            delay = threshold <= 0.2 ? 800 : 400;
      filter.threshold = threshold;
      selection
        .transition()
        .duration(1000)
        .delay(delay)
        .call(r);
    });

  d3.select(window)
    .on('resize', () => {
      selection.attr({
        width: wrapper.clientWidth,
        height: wrapper.clientHeight
      });
    });
});
