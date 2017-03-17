import * as d3 from 'd3';

const d3BarGraph = {};

d3BarGraph.create = function (el, props) {
  // console.log('d3BarGraph.create (state)', state);
  // Create SVG element
  const svg = d3.select(el)
    .append('svg')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'rectangles')
    .attr("transform", "translate(" + 0 + "," + 200 + ")");

};

d3BarGraph.update = function (el, state) {
  // console.log('d3BarGraph.update (state)', state);
  this._drawPoints(el, state);
};

d3BarGraph.destroy = function (el) {
  const g = d3.select(el).selectAll('.rectangles');
  // console.log('d3BarGraph.destroy g', g);
  const bars = g.selectAll('rect');
  bars.remove();
};

d3BarGraph._drawPoints = function (el, data) {
  // console.log('d3BarGraph._drawingPoints', el, data);
  const w = 500;
  const h = 100;
  const g = d3.select(el).selectAll('.rectangles');

  const bars = g.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('fill', 'teal')
     .attr('x', (d, i) =>
      i * (w / data.length)
     )
     .attr('y', h - 1)
     .attr('width', 5)
     .attr('height', 1);

  bars
    .transition()
    .duration(2000)
    .delay(100)
    .attr('y', d =>
      h - (d.visits * 4) // Height minus data value
    )
    .attr('height', d =>
       d.visits * 4
    );
};

module.exports = d3BarGraph;
