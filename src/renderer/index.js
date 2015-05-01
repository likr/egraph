'use strict';

import d3 from 'd3';
import graph from '../graph';
import Layouter from '../layout';
import verticesRenderer from './vertices-renderer';
import edgesRenderer from './edges-renderer';
import TextVertexRenderer from './vertex-renderer/text-vertex-renderer';
import CurvedEdgeRenderer from './edge-renderer/curved-edge-renderer';
import defineAccessors from '../utils/define-accessors';

const render = ({edgeWidth, vertexScale, vertexText, vertexVisibility, layouter, vertexRenderer, edgeRenderer}) => {
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
      .call(edgesRenderer(edgeRenderer));
    selection.selectAll('g.vertices')
      .call(verticesRenderer(vertexRenderer));
  };
};

class Renderer {
  constructor() {
    defineAccessors(this, {}, {
      vertexVisibility: () => true,
      layouter: new Layouter()
        .layerMargin(200)
        .vertexMargin(3)
        .edgeMargin(3),
      vertexRenderer: new TextVertexRenderer(),
      edgeRenderer: new CurvedEdgeRenderer()
    });
  }

  render() {
    return render({
      vertexVisibility: this.vertexVisibility(),
      layouter: this.layouter(),
      vertexRenderer: this.vertexRenderer(),
      edgeRenderer: this.edgeRenderer()
    });
  }
}

export default Renderer;
