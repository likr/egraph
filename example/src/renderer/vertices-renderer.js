'use strict';

const d3 = require('d3'),
      vertexRenderer = require('./vertex-renderer');

const verticesRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.vertex')
        .data(data);

      bindSelection.enter()
        .append('g')
        .classed('vertex', true);

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.vertex')
      .call(vertexRenderer());
  };
};

module.exports = verticesRenderer;
