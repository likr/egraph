'use strict';

const d3 = require('d3'),
      edgeRenderer = require('./edge-renderer');

const edgesRenderer = () => {
  return (selection) => {
    selection.each(function (data) {
      const element = d3.select(this);
      const bindSelection = element.selectAll('g.edge')
        .data(data);

      bindSelection.enter()
        .append('g')
        .classed('edge', true);

      bindSelection.exit()
        .remove();
    });

    selection.selectAll('g.edge')
      .call(edgeRenderer());
  };
};

module.exports = edgesRenderer;
