'use strict';

import d3 from 'd3';
import defineAccessors from '../../utils/define-accessors';
import vertexFunction from '../vertex-function';

const render = ({vertexColor, r}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      if (element.select('circle').empty()) {
        element.append('circle')
          .attr({
            cx: d => d.px,
            cy: d => d.py,
            r: r,
            stroke: 'black',
            fill: vertexFunction(vertexColor)
          });
      }
    });

    selection.select('circle')
      .attr({
        cx: d => d.x,
        cy: d => d.y,
        r: r,
        fill: vertexFunction(vertexColor)
      });
  };
};

class CircleVertexRenderer {
  constructor() {
    defineAccessors(this, {}, {
      vertexColor: () => 'none',
      r: 5
    });
  }

  render() {
    return render({
      vertexColor: this.vertexColor(),
      r: this.r()
    });
  }
}

export default CircleVertexRenderer;
