import * as d3 from 'd3';

const d3Chart = {};

d3Chart.create = function (el, props, state) {
  //Create SVG element
  console.log("inside d3 create");

  let svg = d3.select(el)
    .append('svg')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'd3-points');

  this.update(el, state);
};

d3Chart.update = function (el, state) {
  this._drawPoints(el, state.data);
};

d3Chart.destroy = function (el) {
  // el.remove();
  // return;
};

d3Chart._drawPoints = function (el, data) {
  const g = d3.select(el).selectAll('.d3-points');
  //Width and height
  let w = 500;
  let h = 100;

  const bar = g.selectAll('.d3-points')
     .data(data)
     .enter()
     .append('.d3-points')
     .attr('fill', 'teal')
     .attr('x', function (d, i) {
      return i * (w / data.length);
  })
     .attr('y', h - 1)
     .attr('width', 20)
     .attr('height', 1);

  bars.transition()
    .duration(1000)
    .delay(100)
    .attr('y', function (d) {
      return h - (d * 4);  //Height minus data value
  })
     .attr('height', function (d) {
      return d * 4;
  })

};
module.exports = d3Chart;