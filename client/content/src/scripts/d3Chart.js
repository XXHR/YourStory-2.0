import * as d3 from 'd3';

const d3Chart = {};

d3Chart.create = function (el, props, state) {
  console.log("d3Chart.create (state)", state);
  //Create SVG element
  let svg = d3.select(el)
    .append('svg')
    .attr('width', props.width)
    .attr('height', props.height);

  svg.append('g')
    .attr('class', 'rectangles');

  this.update(el, state);
};

d3Chart.update = function (el, state) {
  console.log("d3Chart.update (state)", state);
  this._drawPoints(el, state);
};

d3Chart.destroy = function (el) {  
  const g = d3.select(el).selectAll('.rectangles');
  console.log("d3Chart.destroy g", g);
  const bars = g.selectAll('rect')
  bars.remove();
};

d3Chart._drawPoints = function (el, data) {
  console.log("d3Chart._drawingPoints", el, data);
  //Width and height
  const w = 500;
  const h = 100;

  const g = d3.select(el).selectAll('.rectangles');

  const bars = g.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr("fill", "teal")
     .attr("x", function(d, i) {
      return i * (w / data.length);
     })
     .attr("y", h - 1)
     .attr("width", 5)
     .attr("height", 1);

  bars
    .transition()
    .duration(1000)
    .delay(100)
    .attr("y", function(d) {
      return h - (d.visits * 4);  //Height minus data value
    })
     .attr("height", function(d) {
      return d.visits * 4;
    })

};

module.exports = d3Chart;

  // console.log("d3Chart._drawingPoints", el, data);

  // //Width and height
  // const w = 500;
  // const h = 100;

  // const g = d3.select(el).selectAll('.rectangles');

  // const bars = g.selectAll('rect')//returns new empty selection
  
  // bars
  //   .data(data); //joined to an array of data

  // bars
  //   .exit()
  //   .remove();

  // bars
  //    .enter()
  //    .append('rect')
  //    .attr("fill", "teal")
  //    .merge()
  //    .attr("x", function(d, i) {
  //     return i * (w / data.length);
  //    })
  //    .attr("y", h - 1)
  //    .attr("width", 20)
  //    .attr("height", 1);