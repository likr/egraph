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

const renderVertices = (g, positions) => {
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
          r: 10,
          fill: (u) => g.vertex(u).dummy ? 'red' : 'black'
        });

      bindSelection.exit()
        .remove();

      element.selectAll('g.vertex')
        .select('circle')
        .attr({
          cx: (u) => positions[u].x,
          cy: (u) => positions[u].y
        });
    });
  };
};

const renderEdges = (positions) => {
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
          stroke: 'black'
        });

      bindSelection.exit()
        .remove();

      element.selectAll('g.edge')
        .select('line')
        .attr({
          x1: ([u, _]) => positions[u].x,
          y1: ([u, _]) => positions[u].y,
          x2: ([_, v]) => positions[v].x,
          y2: ([_, v]) => positions[v].y
        });
    });
  };
};

const render = (selection) => {
  selection.each(function (data) {
    const element = d3.select(this);

    const sizes = {};
    for (const u of g.vertices()) {
      sizes[u] = {
        width: 20,
        height: 20
      };
    }
    const positions = layout(data, sizes, {xMargin: 30, yMargin: 30});

    let edgesSelection = element.select('g.edges');
    if (edgesSelection.empty()) {
      edgesSelection = element.append('g')
        .classed('edges', true);
    }
    edgesSelection
      .datum(Array.from(data.edges()))
      .call(renderEdges(positions));

    let verticesSelection = element.select('g.vertices');
    if (verticesSelection.empty()) {
      verticesSelection = element.append('g')
        .classed('vertices', true);
    }
    verticesSelection
      .datum(Array.from(data.vertices()))
      .call(renderVertices(data, positions));
  });
};

const g = createGraph();

d3.select('#screen')
  .attr({
    width: 1000,
    height: 1000
  })
  .datum(g)
  .call(render);
