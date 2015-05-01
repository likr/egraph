'use strict';

import d3 from 'd3';
import graph from '../graph';
import Layouter from '../layout';
import verticesRenderer from './vertices-renderer';
import edgesRenderer from './edges-renderer';
import defineAccessors from '../utils/define-accessors';

const render = ({vertexColor, vertexText, vertexVisibility, edgeColor, edgeOpacity, layouter}) => {
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

      layouter
        .width(({u}) => widths[u])
        .height(({u}) => heights[u]);
      const positions = layouter.layout(g);

      const element = d3.select(this);

      let contentsSelection = element.selectAll('g.contents');
      if (contentsSelection.empty()) {
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
      .call(edgesRenderer({ltor: layouter.ltor(), edgeColor, edgeOpacity}));
    selection.selectAll('g.vertices')
      .call(verticesRenderer({vertexColor}));
  };
};

const defaultOptions = {
  vertexColor: () => 'none',
  vertexText: ({d}) => d.text,
  vertexVisibility: () => true,
  edgeColor: () => '#000',
  edgeOpacity: () => 1,
  layouter: new Layouter()
    .layerMargin(200)
    .vertexMargin(3)
    .edgeMargin(3)
    .ltor(true)
};

class Renderer {
  constructor() {
    defineAccessors(this, {}, defaultOptions);
  }

  render() {
    const options = {};
    for (const key in defaultOptions) {
      options[key] = this[key]();
    }
    return render(options);
  }
}

export default Renderer;
