'use strict';

const d3 = require('d3'),
      graph = require('../../../lib/graph'),
      layout = require('../../../lib/layout'),
      verticesRenderer = require('./vertices-renderer'),
      edgesRenderer = require('./edges-renderer');

const union = (participants1, participants2) => {
  const set = new Set(participants2),
        result = [];
  for (const participant of participants1) {
    if (set.has(participant)) {
      result.push(participant);
    }
  }
  return result;
};

const renderer = ({vertexWidth, vertexHeight, vertexColor, vertexVisibility, xMargin, yMargin, edgeMargin, ltor}) => {
  return (selection) => {
    selection.each(function (gOrig) {
      const g = graph();
      for (const u of gOrig.vertices()) {
        g.addVertex(u, gOrig.vertex(u));
      }
      for (const [u, v] of gOrig.edges()) {
        g.addEdge(u, v, gOrig.edge(u, v));
      }
      for (const u of g.vertices()) {
        if (!vertexVisibility({u, d: g.vertex(u)})) {
          for (const v of g.inVertices(u)) {
            for (const w of g.outVertices(u)) {
              g.addEdge(v, w);
            }
          }
          g.removeVertex(u);
        }
      }

      const positions = layout(g, {width: vertexWidth, height: vertexHeight, xMargin, yMargin, edgeMargin, ltor});

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

      const vertices = verticesSelection.datum(),
            edges = edgesSelection.datum(),
            activeVertices = new Set(),
            activeEdges = new Set();

      for (const u of g.vertices()) {
        if (vertices[u] === undefined) {
          vertices[u] = {
            key: u,
            x: 0,
            y: 0,
            participants: g.vertex(u).participants,
            data: g.vertex(u)
          };
        }
        vertices[u].px = vertices[u].x;
        vertices[u].py = vertices[u].y;
        vertices[u].x = positions.vertices[u].x;
        vertices[u].y = positions.vertices[u].y;
        vertices[u].dummy = !!g.vertex(u).dummy;
        activeVertices.add(u.toString());
      }
      for (const [u, v] of g.edges()) {
        const key = `${u}:${v}`;
        if (edges[key] === undefined) {
          edges[key] = {
            key: key,
            source: vertices[u],
            target: vertices[v],
            points: [[vertices[u].px, vertices[u].py], [vertices[u].px, vertices[u].py], [vertices[v].px, vertices[v].py], [vertices[v].px, vertices[v].py]],
            participants: union(vertices[u].participants, vertices[v].participants),
            data: g.edge(u, v)
          };
        }
        edges[key].ppoints = edges[key].points;
        edges[key].points = positions.edges[u][v].points;
        activeEdges.add(key);
      }

      for (const key in vertices) {
        if (!activeVertices.has(key)) {
          delete vertices[key];
        }
      }
      for (const key in edges) {
        if (!activeEdges.has(key)) {
          delete edges[key];
        }
      }
    });

    selection.selectAll('g.edges')
      .call(edgesRenderer({ltor}));
    selection.selectAll('g.vertices')
      .call(verticesRenderer({vertexWidth, vertexHeight, vertexColor}));
  };
};

module.exports = renderer;
