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
  console.log('d3BarGraph._drawingPoints', el, data);
  const color = d3.scaleOrdinal(d3.schemeCategory20b);
  const w = 500;
  const h = 100;
  const g = d3.select(el).selectAll('.rectangles');
  const spaceBetweenBars = 0;

  let max = 0;
  let maxSiteName = null;
  data.map((site) => {
    if (site.visits > max) {
      max = site.visits;
      maxSiteName = site.domain;
    }
    return max;
  });

  // max = getMax;
  console.log("max: ", max, maxSiteName);

  const bars = g.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('fill', ((d, i) => {
       return color(d.visits);
     }))
     .attr('class', 'bar-graph-fill')
     .attr('x', (d, i) =>
      i * ((w / data.length) - spaceBetweenBars)
     )
     .attr('y', h - 1)
     .attr('width', 8)
     .attr('height', 1);

  const tooltipD3 = d3.select(el)
    .append('div')
    .attr('class', 'bar-graph-tooltipD3');

  tooltipD3.append('div')
    .attr('class', 'bar-domain-name');

  tooltipD3.append('div')
    .attr('class', 'bar-visits');

  bars
    .transition()
    .duration(2000)
    .delay(100)
    .attr('y', d =>
      h - (d.visits / 6) // Height minus data value
    )
    .attr('height', d =>
       d.visits / 6
    );

  bars
    .on('mouseover', ((d) => {
      tooltipD3.select('.bar-domain-name').html(d.domain);
      // let readableVisits;
      // if(d.visits.length)
      tooltipD3.select('.bar-visits').html('visits: ' + d.visits);
      tooltipD3.style('display', 'block');
    }));

  bars
    .on('mouseout', (() => {
      tooltipD3.style('display', 'none');
    }));
};

module.exports = d3BarGraph;
