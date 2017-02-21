import * as d3 from 'd3';

const d3Chart = {};

d3Chart.create = function (el, props, state) {
  //Create SVG element
  let svg = d3.select(el)
    .append('svg')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'd3-points');

  this.update(el, state);
};

d3Chart.update = function (el, state) {
  this._drawPoints(el, state);
};

d3Chart.destroy = function (el) {
  // el.remove();
  // return;
};

d3Chart._drawPoints = function (el, data) {  
  //Width and height
  var w = 500;
  var h = 100;

  var g = d3.select(el).selectAll('.d3-points');

  var bars = g.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr("fill", "teal")
     .attr("x", function(d, i) {
      return i * (w / data.length);
  })
     .attr("y", h - 1)
     .attr("width", 20)
     .attr("height", 1);

  bars.transition()
    .duration(1000)
    .delay(100)
    .attr("y", function(d) {
      return h - (d * 4);  //Height minus data value
  })
     .attr("height", function(d) {
      return d * 4;
  })
};

module.exports = d3Chart;