'use strict';

const d3 = require('d3'),
      vertexRenderer = require('./vertex-renderer');

const verticesRenderer = ({vertexWidth, vertexHeight}) => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.vertex')
        .data(Object.keys(data).map(key => data[key]).filter(d => d.active), (d) => d.key);

      bindSelection.enter()
        .append('g')
        .classed('vertex', true);

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.vertex')
      .call(vertexRenderer({vertexWidth, vertexHeight}));
  };
};

module.exports = verticesRenderer;
