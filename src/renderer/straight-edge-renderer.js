'use strict';

import d3 from 'd3';
import startFrom from './svg/path/start-from';
import lineTo from './svg/path/line-to';

const svgPath = (points) => {
  let d = `${startFrom(points[0])}`;
  for (let i = 1; i < points.length; ++i) {
    d += lineTo(points[i]);
  }
  return d;
};

const straightEdgeRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.selectAll('path').empty()) {
        element
          .append('path')
          .attr({
            d: d => svgPath(d.ppoints),
            stroke: 'black',
            fill: 'none',
            opacity: 0.3
          });
      }
      if (data.ppoints.length < data.points.length) {
        for (let i = data.ppoints.length; i < data.points.length; ++i) {
          data.ppoints.unshift(data.ppoints[0]);
        }
        element.selectAll('path')
          .attr('d', d => svgPath(d.ppoints));
      }
    });

    selection.selectAll('path')
      .attr({
        d: d => svgPath(d.points)
      });
  };
};

export default straightEdgeRenderer;
