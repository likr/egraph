'use strict';

import d3 from 'd3';
import defineAccessors from '../utils/define-accessors';
import vertexFunction from './vertex-function';

const render = ({vertexColor, vertexScale, vertexText}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('rect').empty()) {
        element.append('rect')
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
        element.append('text')
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
      .text(vertexFunction(vertexText))
      .attr({
        x: d => d.x - d.width / 2,
        y: d => d.y - d.height / 2,
        'font-size': (d, i) => vertexFunction(vertexScale)(d, i) * 12 + 'pt'
      });
  };
};

const calcSize = (g, vertexScale, vertexText) => {
  const tmpSvg = d3.select('body').append('svg'),
        text = tmpSvg.append('text'),
        sizes = {};
  for (const u of g.vertices()) {
    const d = g.vertex(u),
          s = vertexText({u, d}),
          bbox = text.text(s).node().getBBox(),
          scale = vertexScale({d, u});
    sizes[u] = {
      width: bbox.width * scale,
      height: bbox.height * scale
    };
  }
  tmpSvg.remove();
  return sizes;
};

class VertexRenderer {
  constructor() {
    defineAccessors(this, {}, {
      vertexColor: () => 'none',
      vertexScale: () => 1,
      vertexText: ({d}) => d.text
    });
  }

  render() {
    return render({
      vertexColor: this.vertexColor(),
      vertexScale: this.vertexScale(),
      vertexText: this.vertexText()
    });
  }

  calcSize(g) {
    return calcSize(g, this.vertexScale(), this.vertexText());
  }
}

export default VertexRenderer;
