'use strict';

const d3 = require('d3');

const vertexRenderer = ({vertexWidth, vertexHeight}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('rect').empty()) {
        element
          .append('rect')
          .attr({
            x: d => d.px - vertexWidth({u: d.key, d: d.data}) / 2,
            y: d => d.py - vertexHeight({u: d.key, d: d.data}) / 2,
            width: d => vertexWidth({u: d.key, d: d.data}),
            height: d => vertexHeight({u: d.key, d: d.data}),
            rx: 1,
            ry: 1,
            stroke: 'black',
            'stroke-opacity': 0.3
          });
      }
    });

    selection.select('rect')
      .attr({
        x: d => d.x - vertexWidth({u: d.key, d: d.data}) / 2,
        y: d => d.y - vertexHeight({u: d.key, d: d.data}) / 2,
        width: d => vertexWidth({u: d.key, d: d.data}),
        height: d => vertexHeight({u: d.key, d: d.data}),
        fill: d => d.data.color
      });
  };
};

module.exports = vertexRenderer;
