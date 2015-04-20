'use strict';

const d3 = require('d3'),
      graph = require('../lib/graph'),
      layout = require('../lib/layout');

const createGraph = () => {
  const g = graph();
  const a1 = g.addVertex();
  const a2 = g.addVertex();
  const a3 = g.addVertex();
  const b1 = g.addVertex();
  const b2 = g.addVertex();
  const b3 = g.addVertex();
  const c1 = g.addVertex();
  const c2 = g.addVertex();
  const c3 = g.addVertex();
  const d1 = g.addVertex();
  const d2 = g.addVertex();
  const d3 = g.addVertex();
  g.addEdge(a1, b2);
  g.addEdge(a2, b1);
  g.addEdge(a3, b1);
  g.addEdge(b1, c1);
  g.addEdge(b2, c1);
  g.addEdge(b2, c2);
  g.addEdge(b2, c3);
  g.addEdge(b3, c2);
  g.addEdge(c1, d3);
  g.addEdge(c2, d1);
  g.addEdge(c2, d2);
  return g;
};

const renderVertices = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.vertex')
        .data(data);

      bindSelection.enter()
        .append('g')
        .classed('vertex', true)
        .append('circle')
        .attr({
          cx: 0,
          cy: 0,
          r: 10,
          fill: d => d.dummy ? 'red' : 'black'
        });

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.vertex')
      .select('circle')
      .attr({
        cx: d => d.x,
        cy: d => d.y
      });
  };
};

const renderEdges = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.edge')
        .data(data);

      bindSelection.enter()
        .append('g')
        .classed('edge', true)
        .append('line')
        .attr({
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          stroke: 'black'
        });

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.edge')
      .select('line')
      .attr({
        x1: d => d.x1,
        y1: d => d.y1,
        x2: d => d.x2,
        y2: d => d.y2
      });
  };
};

const render = (selection) => {
  selection.each(function (data) {
    const sizes = {};
    for (const u of g.vertices()) {
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
    .call(renderEdges());
  selection.selectAll('g.vertices')
    .call(renderVertices());
};

const g = createGraph();

d3.select('#screen')
  .attr({
    width: 1000,
    height: 1000
  })
  .datum(g)
  .transition()
  .call(render);
