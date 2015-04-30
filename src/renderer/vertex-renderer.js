'use strict';

import d3 from 'd3';
import vertexFunction from './vertex-function';

const vertexRenderer = ({vertexColor}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('g').empty()) {
        const g = element
          .append('g');
        g.append('rect')
          .attr({
            x: d => d.px - d.width / 2,
            y: d => d.py - d.height / 2,
            width: d => d.width,
            height: d => d.height,
            rx: 1,
            ry: 1,
            stroke: 'black',
            fill: vertexFunction(vertexColor)
          });
        g.append('text')
          .attr({
            x: d => d.px - d.width / 2,
            y: d => d.py - d.height / 2,
            fill: 'black',
            'dominant-baseline': 'text-before-edge',
            'stroke-opacity': 1
          });
      }
    });

    selection.select('rect')
      .attr({
        x: d => d.x - d.width / 2,
        y: d => d.y - d.height / 2,
        width: d => d.width,
        height: d => d.height,
        fill: vertexFunction(vertexColor)
      });
    selection.select('text')
      .text(d => d.text)
      .attr({
        x: d => d.x - d.width / 2,
        y: d => d.y - d.height / 2
      });
  };
};

export default vertexRenderer;
