'use strict';

import d3 from 'd3';
import graph from '../graph';
import layout from '../layout';
import verticesRenderer from './vertices-renderer';
import edgesRenderer from './edges-renderer';

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

const renderer = ({vertexColor, vertexText, vertexVisibility, edgeColor, edgeOpacity, xMargin, yMargin, edgeMargin, ltor}) => {
  return (selection) => {
    selection.each(function (gOrig) {
      const g = graph();
      const texts = {},
            widths = {},
            heights = {},
            tmpSvg = d3.select('body').append('svg'),
            text = tmpSvg.append('text');
      for (const u of gOrig.vertices()) {
        const d = gOrig.vertex(u),
              s = vertexText({u, d}),
              bbox = text.text(s).node().getBBox();
        g.addVertex(u, d);
        texts[u] = s;
        widths[u] = bbox.width;
        heights[u] = bbox.height;
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
      tmpSvg.remove();

      const width = ({u}) => widths[u],
            height = ({u}) => heights[u],
            positions = layout(g, {width, height, xMargin, yMargin, edgeMargin, ltor});

      const element = d3.select(this);

      let contentsSelection = element.selectAll('g.contents');
      if (contentsSelection.empty()) {
        const zoom = d3.behavior.zoom()
          .scaleExtent([0.1, 1])
          .on('zoom', () => {
            const e = d3.event,
                  transform = `translate(${e.translate[0]},${e.translate[1]})scale(${e.scale})`;
            contentsSelection.attr('transform', transform);
          });
        element.call(zoom);
        contentsSelection = element.append('g')
          .classed('contents', true);
      }
      let edgesSelection = element.selectAll('g.edges');
      if (edgesSelection.empty()) {
        edgesSelection = contentsSelection.append('g')
          .classed('edges', true)
          .datum({});
      }
      let verticesSelection = element.selectAll('g.vertices');
      if (verticesSelection.empty()) {
        verticesSelection = contentsSelection.append('g')
          .classed('vertices', true)
          .datum({});
      }

      const vertices = verticesSelection.datum(),
            edges = edgesSelection.datum(),
            activeVertices = new Set(),
            activeEdges = new Set();

      for (const u of g.vertices()) {
        const d = g.vertex(u);
        if (vertices[u] === undefined) {
          vertices[u] = {
            key: u,
            x: 0,
            y: 0,
            participants: d.participants,
            data: d
          };
        }
        vertices[u].text = texts[u];
        vertices[u].px = vertices[u].x;
        vertices[u].py = vertices[u].y;
        vertices[u].x = positions.vertices[u].x;
        vertices[u].y = positions.vertices[u].y;
        vertices[u].width = positions.vertices[u].width;
        vertices[u].height = positions.vertices[u].height;
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
      .call(edgesRenderer({ltor, edgeColor, edgeOpacity}));
    selection.selectAll('g.vertices')
      .call(verticesRenderer({vertexColor}));
  };
};

export default renderer;
