'use strict';

const d3 = require('d3');

const vertexRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      d3.select(this)
        .append('circle')
        .attr({
          cx: 0,
          cy: 0,
          r: 10,
          fill: d => d.dummy ? 'red' : 'black'
        });
    });

    selection.select('circle')
      .attr({
        cx: d => d.x,
        cy: d => d.y
      });
  };
};

module.exports = vertexRenderer;
