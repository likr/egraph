'use strict';

const d3 = require('d3');

const vertexRenderer = ({vertexWidth, vertexHeight}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('circle').empty()) {
        element
          .append('circle')
          .attr({
            cx: d => d.px,
            cy: d => d.py,
            r: d => d.dummy ? 0 : 0.5 * Math.min(vertexWidth({u: d.key, d: d.data}),
                                                 vertexHeight({u: d.key, d: d.data})),
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
