'use strict';

const d3 = require('d3');

const vertexRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('circle').empty()) {
        element
          .append('circle')
          .attr({
            cx: d => d.px,
            cy: d => d.py,
            r: d => d.dummy ? 0 : 10,
            fill: 'black'
          });
      }
    });

    selection.select('circle')
      .attr({
        cx: d => d.x,
        cy: d => d.y,
        fill: d => d.data.color
      });
  };
};

module.exports = vertexRenderer;
