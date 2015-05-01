'use strict';

import d3 from 'd3';

const verticesRenderer = (vertexRenderer) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.vertex')
        .data(Object.keys(data).map(key => data[key]), (d) => d.key);

      bindSelection.enter()
        .append('g')
        .classed('vertex', true);

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.vertex')
      .call(vertexRenderer.render());
  };
};

export default verticesRenderer;
