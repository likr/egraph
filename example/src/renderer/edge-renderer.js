'use strict';

const d3 = require('d3');

const edgeRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('line').empty()) {
        element
          .append('line')
          .attr({
            x1: d => d.px1,
            y1: d => d.py1,
            x2: d => d.px2,
            y2: d => d.py2,
            stroke: 'black'
          });
      }
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
