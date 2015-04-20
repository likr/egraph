'use strict';

const d3 = require('d3'),
      layout = require('../../../lib/layout'),
      verticesRenderer = require('./vertices-renderer'),
      edgesRenderer = require('./edges-renderer');

const renderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const sizes = {};
      for (const u of data.vertices()) {
        sizes[u] = {
          width: 20,
          height: 20
        };
      }
      const positions = layout(data, sizes, {xMargin: 30, yMargin: 30});

      const element = d3.select(this);

      let edgesSelection = element.select('g.edges');
      if (edgesSelection.empty()) {
        edgesSelection = element.append('g')
          .classed('edges', true);
      }
      edgesSelection
        .datum(Array.from(data.edges()).map(([u, v]) => ({
          x1: positions[u].x,
          y1: positions[u].y,
          x2: positions[v].x,
          y2: positions[v].y
        })));

      let verticesSelection = element.select('g.vertices');
      if (verticesSelection.empty()) {
        verticesSelection = element.append('g')
          .classed('vertices', true);
      }
      verticesSelection
        .datum(Array.from(data.vertices()).map(u => ({
          x: positions[u].x,
          y: positions[u].y,
          dummy: !!data.vertex(u).dummy
        })));
    });

    selection.selectAll('g.edges')
      .call(edgesRenderer());
    selection.selectAll('g.vertices')
      .call(verticesRenderer());
  };
};

module.exports = renderer;
