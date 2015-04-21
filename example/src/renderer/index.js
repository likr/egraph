'use strict';

const d3 = require('d3'),
      layout = require('../../../lib/layout'),
      verticesRenderer = require('./vertices-renderer'),
      edgesRenderer = require('./edges-renderer');

const renderer = ({vertexWidth, vertexHeight}) => {
  return (selection) => {
    selection.each(function (data) {
      const sizes = {};
      for (const u of data.vertices()) {
        sizes[u] = {
          width: vertexWidth({u, d: data.vertex(u)}),
          height: vertexHeight({u, d: data.vertex(u)})
        };
      }
      const positions = layout(data, sizes, {xMargin: 10, yMargin: 20});

      const element = d3.select(this);

      let edgesSelection = element.selectAll('g.edges');
      if (edgesSelection.empty()) {
        edgesSelection = element.append('g')
          .classed('edges', true)
          .datum({});
      }
      let verticesSelection = element.selectAll('g.vertices');
      if (verticesSelection.empty()) {
        verticesSelection = element.append('g')
          .classed('vertices', true)
          .datum({});
      }

      const vertices = verticesSelection.datum();
      const edges = edgesSelection.datum();

      for (const key in vertices) {
        vertices[key].active = false;
      }
      for (const u of data.vertices()) {
        if (vertices[u] === undefined) {
          vertices[u] = {
            key: u,
            x: 0,
            y: 0,
            data: data.vertex(u)
          };
        }
        vertices[u].px = vertices[u].x;
        vertices[u].py = vertices[u].y;
        vertices[u].x = positions[u].x;
        vertices[u].y = positions[u].y;
        vertices[u].dummy = !!data.vertex(u).dummy;
        vertices[u].active = true;
      }
      for (const key in edges) {
        edges[key].active = false;
      }
      for (const [u, v] of data.edges()) {
        const key = `${u}:${v}`;
        if (edges[key] === undefined) {
          edges[key] = {
            key: key,
            source: vertices[u],
            target: vertices[v],
            x1: vertices[u].px,
            y1: vertices[u].py,
            x2: vertices[v].px,
            y2: vertices[v].py,
            data: data.edge(u, v)
          };
        }
        edges[key].px1 = edges[key].x1;
        edges[key].py1 = edges[key].y1;
        edges[key].px2 = edges[key].x2;
        edges[key].py2 = edges[key].y2;
        edges[key].x1 = positions[u].x;
        edges[key].y1 = positions[u].y;
        edges[key].x2 = positions[v].x;
        edges[key].y2 = positions[v].y;
        edges[key].active = true;
      }
    });

    selection.selectAll('g.edges')
      .call(edgesRenderer({vertexHeight}));
    selection.selectAll('g.vertices')
      .call(verticesRenderer({vertexWidth, vertexHeight}));
  };
};

module.exports = renderer;
