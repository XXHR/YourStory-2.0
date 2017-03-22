import * as d3 from 'd3';

const d3BarGraph = {};

d3BarGraph.create = function (el, state) {
  const svgContainerWidth = 450;
  const svgContainerHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = svgContainerWidth - margin.left - margin.right;
  const height = svgContainerHeight - margin.top - margin.bottom - 50;
  const translateLeftValue = 45;

  const svg = d3.select(el).select('.chart')
    .append('svg')
      .attr('class', 'svg-container')
      .attr('width', svgContainerWidth)
      .attr('height', svgContainerHeight)
    .append('g')
      .attr('transform', 'translate(' + translateLeftValue + ',' + margin.top + ')');

  this.createAxis(svg, { width, height, svg }, state);
};


d3BarGraph.createAxis = function (el, properties, state) {
  const svgContainer = properties.svg;
  const xAxisRangeEnd = properties.width;
  const yAxisRangeEnd = properties.height;
  let maxVisits = 0;
  let totalVisitCount = 0;
  let data = null;

  const getMaxAndTotalVisitCountValues = () => {
    return state.map((site) => {
      totalVisitCount += site.visits;
      if (site.visits > maxVisits) {
        maxVisits = site.visits;
      }
      return maxVisits;
    });
  };
  getMaxAndTotalVisitCountValues();
  data = state.sort((a, b) => b.visits - a.visits).slice(0, 10);

  const x = d3.scaleBand().rangeRound([0, xAxisRangeEnd]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([yAxisRangeEnd, 0]);
  x.domain(data.map(d => d.domain));
  y.domain([0, d3.max(data, d => d.visits)]);

  svgContainer
    .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + (properties.height) + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', function (d) {
        return 'rotate(-30)';
      });

  svgContainer
    .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

  this.createBars(svgContainer, properties.height, x, y, data);
};

d3BarGraph.createBars = function (axis, height, x, y, data) {
  const color = d3.scaleOrdinal(d3.schemeCategory20b);
  axis
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('a')
      .attr('xlink:href', d => ('http://www.' + d.domain))
    .append('rect')
      .attr('class', 'bar')
      .attr('width', x.bandwidth())
      .attr('x', d => x(d.domain))
    .attr("y", height)
    .attr("height", 0)
    .transition()
    .duration(1000)
      .attr('y', d => y(d.visits))
      .attr('fill', ((d, i) => {
        return color(d.domain);
      }))
      .attr('height', d => height - y(d.visits));

  // this.addTooltips(axis, data);
};

d3BarGraph.update = function (el, state) {
  this.create(el, state);
};

d3BarGraph.destroy = function (el) {
  const svgContainer = d3.select(el).selectAll('.svg-container');
  svgContainer.remove();
};

d3BarGraph.addTooltips = function (el, data) {
  // console.log("el", el._groups[0][0].selectAll(rect));
  // const tooltipD3 = d3.select(el)
  //   .append('div')
  //     .attr('class', 'bar-graph-tooltipD3');

  // tooltipD3
  //   .append('div')
  //     .attr('class', 'bar-domain-name');

  // tooltipD3
  //   .append('div')
  //     .attr('class', 'bar-visits');

  // el
  //   .transition()
  //   .duration(2000)
  //   .delay(100)
  //   .attr('y', d =>
  //     h - (d.visits / 6) // Height minus data value
  //   )
  //   .attr('height', d =>
  //      d.visits / 6
  //   );

  // el
  //   .on('mouseover', ((d) => {
  //     tooltipD3.select('.bar-domain-name').html(d.domain);
  //     // let readableVisits;
  //     // if(d.visits.length)
  //     tooltipD3.select('.bar-visits').html('visits: ' + d.visits);
  //     tooltipD3.style('display', 'block');
  //   }));

  // el
  //   .on('mouseout', (() => {
  //     tooltipD3.style('display', 'none');
  //   }));
};

module.exports = d3BarGraph;