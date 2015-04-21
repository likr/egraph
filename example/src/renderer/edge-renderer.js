'use strict';

const d3 = require('d3');

const edgeRenderer = ({vertexHeight}) => {
  const svgPath = (x1, y1, x2, y2) => {
    const dx = x2 - x1,
          dy = y2 - y1;
    return `M${x1} ${y1} q ${0} ${dy / 4}, ${dx / 2} ${dy / 2} q ${dx / 2} ${dy / 4}, ${dx / 2} ${dy / 2}`;
  };
  const offset = (d) => d.dummy ? 0 : vertexHeight({u: d.key, d: d.data}) / 2;

  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('path').empty()) {
        element
          .append('path')
          .attr({
            d: d => svgPath(d.px1, d.py1 + offset(d.source),
                            d.px2, d.py2 - offset(d.target)),
            stroke: 'black',
            fill: 'none'
          });
      }
    });

    selection.select('path')
      .attr({
        d: d => svgPath(d.x1, d.y1 + offset(d.source),
                        d.x2, d.y2 - offset(d.target))
      });
  };
};

module.exports = edgeRenderer;
