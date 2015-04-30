'use strict';

const d3 = require('d3'),
      edgeFunction = require('./edge-function'),
      startFrom = require('./svg/path/start-from'),
      lineTo = require('./svg/path/line-to');

const curveTo = ([x1, y1], [x2, y2], ltor) => {
  const dx = x2 - x1,
        dy = y2 - y1;
  return ltor
    ? ` q ${dx / 4} ${0}, ${dx / 2} ${dy / 2} q ${dx / 4} ${dy / 2}, ${dx / 2} ${dy / 2}`
    : ` q ${0} ${dy / 4}, ${dx / 2} ${dy / 2} q ${dx / 2} ${dy / 4}, ${dx / 2} ${dy / 2}`;
};

const svgPath = (points, ltor) => {
  let d = `${startFrom(points[0])}${lineTo(points[1])}`;
  for (let i = 3; i < points.length; i += 2) {
    d += curveTo(points[i - 2], points[i - 1], ltor) + lineTo(points[i]);
  }
  return d;
};

const curvedEdgeRenderer = ({edgeColor, edgeOpacity, ltor}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('path').empty()) {
        element
          .append('path')
          .attr({
            d: d => svgPath(d.ppoints, ltor),
            stroke: (d, i) => edgeFunction(edgeColor, d, i),
            opacity: (d, i) => edgeFunction(edgeOpacity, d, i),
            fill: 'none'
          });
      }
      if (data.ppoints.length < data.points.length) {
        for (let i = data.ppoints.length; i < data.points.length; ++i) {
          data.ppoints.unshift(data.ppoints[0]);
        }
        element.select('path')
          .attr('d', d => svgPath(d.ppoints, ltor));
      }
    });

    selection.select('path')
      .attr({
        d: d => svgPath(d.points, ltor),
        stroke: (d, i) => edgeFunction(edgeColor, d, i),
        opacity: (d, i) => edgeFunction(edgeOpacity, d, i)
      });
  };
};

module.exports = curvedEdgeRenderer;
