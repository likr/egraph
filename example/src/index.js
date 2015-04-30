'use strict';

import querystring from 'querystring'
import d3 from 'd3';
import graph from '../../src/graph';
import katz from '../../src/network/centrality/katz';
import newman from '../../src/network/community/newman';
import Renderer from '../../src/renderer';

const parseHash = () => {
  const params = querystring.parse(location.hash.substr(2));
  params.threshold = +params.threshold || 0;
  params.x = +params.x || 0;
  params.y = +params.y || 0;
  params.scale = +params.scale || 1;
  params.init = !!params.init;
  return params;
};

const updateHash = (args) => {
  location.hash = `?${querystring.stringify(args)}`;
};

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
  const params = parseHash();

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
  const color = d3.scale.category20();
  const communities = newman(g);
  for (const u of g.vertices()) {
    color(communities[u]);
    g.vertex(u).community = communities[u];
  }

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

  const zoom = d3.behavior.zoom()
    .translate([params.x, params.y])
    .scale(params.scale)
    .scaleExtent([0.1, 1])
    .on('zoom', () => {
      const e = d3.event;
      updateHash({
        threshold: params.threshold,
        x: e.translate[0],
        y: e.translate[1],
        scale: e.scale
      });
    });

  const wrapper = d3.select('#screen-wrapper').node(),
        selection = d3.select('#screen')
          .attr({
            width: wrapper.clientWidth,
            height: wrapper.clientHeight
          })
          .datum(g)
          .call(zoom);

  d3.select('#threshold')
    .on('input', function() {
      d3.select('#threshold-value').text(`${((1 - +this.value) * 100).toFixed()}%`);
    })
    .on('change', function () {
      updateHash({
        threshold: +this.value,
        x: params.x,
        y: params.y,
        scale: params.scale
      });
    });

  d3.select(window)
    .on('resize', () => {
      selection.attr({
        width: wrapper.clientWidth,
        height: wrapper.clientHeight
      });
    });

  d3.select(window)
    .on('hashchange', () => {
      const {threshold, x, y, scale, init} = parseHash();
      if (init || threshold !== params.threshold) {
        d3.select('#threshold').node().value = threshold;
        d3.select('#threshold-value').text(`${((1 - threshold) * 100).toFixed()}%`);
        filter.threshold = threshold;
        selection
          .transition()
          .duration(1000)
          .delay(500)
          .call(renderer.render());
        params.threshold = threshold;
      }
      if (init || x !== params.x || y !== params.y || scale !== params.scale) {
        selection.select('g.contents')
          .attr('transform', `translate(${x},${y})scale(${scale})`);
        params.x = x;
        params.y = y;
        params.scale = scale;
      }
      if (init) {
        updateHash({
          threshold: params.threshold,
          x: params.x,
          y: params.y,
          scale: params.scale
        });
      }
    });

  updateHash({
    threshold: params.threshold,
    x: params.x,
    y: params.y,
    scale: params.scale,
    init: 1
  });
});
