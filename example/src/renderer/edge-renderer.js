'use strict';

const d3 = require('d3');

const edgeRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      d3.select(this)
        .append('line')
        .attr({
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          stroke: 'black'
        });
    });

    selection.select('line')
      .attr({
        x1: d => d.x1,
        y1: d => d.y1,
        x2: d => d.x2,
        y2: d => d.y2
      });
  };
};

module.exports = edgeRenderer;
