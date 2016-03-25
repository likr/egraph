# egraph
Layered graph layout tools

# Quick Start

## Developing a graph

```javascript
var Graph = require('egraph/lib/graph');

var graph = new Graph();
var u = 0;
var v = 1;
graph.addVertex(u, {label: 'Vertex 1', width: 5, height: 5});
graph.addVertex(v, {label: 'Vertex 2', width: 5, height: 5});
graph.addEdge(u, v, {weight: 1});
```

## Laying out a graph

```javascript
var Layouter = require('egraph/lib/layouter/sugiyama');
var layouter = new Layouter()
  .vertexWidth((arg) => arg.d.width)
  .vertexHeight((arg) => arg.d.height);
var layout = layouter.layout(graph);
//> {
//>   vertices: {
//>     '0': { x: 2.5, y: 2.5, width: 5, height: 5, layer: 0, order: 0 },
//>     '1': { x: 17.5, y: 2.5, width: 5, height: 5, layer: 1, order: 0 }
//>   },
//>   edges: {
//>     '0': {
//>       '1': { points: [ [ 5, 2.5 ], [ 15, 2.5 ] ], reversed: false, width: 1 }
//>     },
//>     '1': {}
//>   }
//> }
```
