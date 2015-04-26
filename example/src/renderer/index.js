'use strict';

const d3 = require('d3'),
      layout = require('../../../lib/layout'),
      verticesRenderer = require('./vertices-renderer'),
      edgesRenderer = require('./edges-renderer');

const renderer = ({vertexWidth, vertexHeight, vertexColor, xMargin, yMargin, edgeMargin, ltor}) => {
  return (selection) => {
    selection.each(function (data) {
      const positions = layout(data, {width: vertexWidth, height: vertexHeight, xMargin, yMargin, edgeMargin, ltor});

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
        vertices[u].x = positions.vertices[u].x;
        vertices[u].y = positions.vertices[u].y;
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
            points: [[0, 0], [0, 0], [0, 0], [0, 0]],
            data: data.edge(u, v)
          };
        }
        edges[key].ppoints = edges[key].points;
        edges[key].points = positions.edges[u][v].points;
        edges[key].active = true;
      }
    });

    selection.selectAll('g.edges')
      .call(edgesRenderer({ltor}));
    selection.selectAll('g.vertices')
      .call(verticesRenderer({vertexWidth, vertexHeight, vertexColor}));
  };
};

module.exports = renderer;
