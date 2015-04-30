'use strict';

import d3 from 'd3';
import vertexRenderer from './vertex-renderer';

const verticesRenderer = ({vertexColor}) => {
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
      .call(vertexRenderer({vertexColor}));
  };
};

export default verticesRenderer;
