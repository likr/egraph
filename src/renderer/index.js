'use strict';

import d3 from 'd3';
import Graph from '../graph';
import layouter from '../layouter';
import verticesRenderer from './vertices-renderer';
import edgesRenderer from './edges-renderer';
import TextVertexRenderer from './vertex-renderer/text-vertex-renderer';
import CurvedEdgeRenderer from './edge-renderer/curved-edge-renderer';
import accessor from '../utils/accessor';

const render = ({vertexVisibility, edgeVisibility, layouter, vertexRenderer, edgeRenderer}) => {
  return (selection) => {
    selection.each(function (gOrig) {
      const g = new Graph();
      for (const u of gOrig.vertices()) {
        g.addVertex(u, gOrig.vertex(u));
      }
      for (const [u, v] of gOrig.edges()) {
        const ud = gOrig.vertex(u),
              vd = gOrig.vertex(v),
              d = gOrig.edge(u, v);
        if (edgeVisibility({u, v, ud, vd, d})) {
          g.addEdge(u, v, gOrig.edge(u, v));
        }
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
        vertices[u].g = g;
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
        edges[key].g = g;
        edges[key].ppoints = edges[key].points;
        edges[key].points = positions.edges[u][v].points;
        edges[key].width = positions.edges[u][v].width;
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

const privates = new WeakMap();

class Renderer {
  constructor() {
    privates.set(this, {
      vertexVisibility: () => true,
      edgeVisibility: () => true,
      layouter: new layouter.SugiyamaLayouter()
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
      edgeVisibility: this.edgeVisibility(),
      layouter: this.layouter(),
      vertexRenderer: this.vertexRenderer(),
      edgeRenderer: this.edgeRenderer()
    });
  }

  vertexVisibility(arg) {
    return accessor(this, privates, 'vertexVisibility', arguments);
  }

  edgeVisibility(arg) {
    return accessor(this, privates, 'edgeVisibility', arguments);
  }

  layouter(arg) {
    return accessor(this, privates, 'layouter', arguments);
  }

  vertexRenderer(arg) {
    return accessor(this, privates, 'vertexRenderer', arguments);
  }

  edgeRenderer(arg) {
    return accessor(this, privates, 'edgeRenderer', arguments);
  }
}

export default Renderer;
