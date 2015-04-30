'use strict';

import d3 from 'd3';
import graph from '../../src/graph';
import katz from '../../src/network/centrality/katz';
import newman from '../../src/network/community/newman';
import Renderer from '../../src/renderer';

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

d3.json('data/graph.json', (data) => {
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
  const communities = newman(g);
  for (const u of g.vertices()) {
    g.vertex(u).community = communities[u];
  }
  const color = d3.scale.category20();

  const renderer = new Renderer()
    .vertexColor(({d}) => color(d.community))
    .vertexText(({d}) => cutoff(d.text, 20))
    .vertexVisibility(({u}) => filter.call(u))
    .edgeColor(({ud, vd}) => ud.community === vd.community ? color(ud.community) : '#ccc')
    .edgeOpacity(() => 1)
    .xMargin(200)
    .yMargin(3)
    .edgeMargin(3)
    .ltor(true);

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
    .delay(500)
    .call(renderer.render());

  d3.select('#threshold').node().value = '0';
  d3.select('#threshold')
    .on('input', function() {
      const threshold = +this.value;
      d3.select('#threshold-value').text(`${((1 - threshold) * 100).toFixed()}%`);
    })
    .on('change', function () {
      const threshold = +this.value;
      filter.threshold = threshold;
      selection
        .transition()
        .duration(1000)
        .delay(500)
        .call(renderer.render());
    });

  d3.select(window)
    .on('resize', () => {
      selection.attr({
        width: wrapper.clientWidth,
        height: wrapper.clientHeight
      });
    });
});
