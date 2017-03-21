// import * as d3 from 'd3';

// const d3BarGraph = {};

// d3BarGraph.create = function (el, props) {
//   // console.log('d3BarGraph.create (state)', state);
//   // Create SVG element
//   const svg = d3.select(el)
//     .append('svg')
//     .attr('width', props.width)
//     .attr('height', props.height);

//   svg.append('g')
//     .attr('class', 'rectangles')
//     .attr("transform", "translate(" + 0 + "," + 200 + ")");
// };

// d3BarGraph.update = function (el, state) {
//   // console.log('d3BarGraph.update (state)', state);
//   this._drawPoints(el, state);
// };

// d3BarGraph.destroy = function (el) {
//   const g = d3.select(el).selectAll('.rectangles');
//   // console.log('d3BarGraph.destroy g', g);
//   const bars = g.selectAll('rect');
//   bars.remove();
// };

// d3BarGraph._drawPoints = function (el, data) {
//   console.log('d3BarGraph._drawingPoints', el, data);
//   const color = d3.scaleOrdinal(d3.schemeCategory20b);
//   const w = 500;
//   const h = 100;
//   const g = d3.select(el).selectAll('.rectangles');
//   const spaceBetweenBars = 0;

//   let max = 0;
//   let maxSiteName = null;
//   data.map((site) => {
//     if (site.visits > max) {
//       max = site.visits;
//       maxSiteName = site.domain;
//     }
//     return max;
//   });

//   // max = getMax;
//   console.log("max: ", max, maxSiteName);

//   const bars = g.selectAll('rect')
//      .data(data)
//      .enter()
//      .append('rect')
//      .attr('fill', ((d, i) => {
//        return color(d.visits);
//      }))
//      .attr('class', 'bar-graph-fill')
//      .attr('x', (d, i) =>
//       i * ((w / data.length) - spaceBetweenBars)
//      )
//      .attr('y', h - 1)
//      .attr('width', 8)
//      .attr('height', 1);

//   const tooltipD3 = d3.select(el)
//     .append('div')
//     .attr('class', 'bar-graph-tooltipD3');

//   tooltipD3.append('div')
//     .attr('class', 'bar-domain-name');

//   tooltipD3.append('div')
//     .attr('class', 'bar-visits');

//   bars
//     .transition()
//     .duration(2000)
//     .delay(100)
//     .attr('y', d =>
//       h - (d.visits / 6) // Height minus data value
//     )
//     .attr('height', d =>
//        d.visits / 6
//     );

//   bars
//     .on('mouseover', ((d) => {
//       tooltipD3.select('.bar-domain-name').html(d.domain);
//       // let readableVisits;
//       // if(d.visits.length)
//       tooltipD3.select('.bar-visits').html('visits: ' + d.visits);
//       tooltipD3.style('display', 'block');
//     }));

//   bars
//     .on('mouseout', (() => {
//       tooltipD3.style('display', 'none');
//     }));
// };

// module.exports = d3BarGraph;

import * as d3 from 'd3';

const d3BarGraph = {};

d3BarGraph.create = function (el, state) {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 425 - margin.left - margin.right;
  const height = 200 - margin.top - margin.bottom;

  const translateLeftValue = 45;

  const svg = d3.select(el)
    .append('svg')
      .attr('class', 'svg-container')
      .attr('width', 425)
      .attr('height', 250)
    .append('g')
      .attr('transform', "translate(" +  translateLeftValue + "," + margin.top + ")");

  this.createAxis(svg, { width, height, svg }, state);
};

d3BarGraph.createAxis = function (el, properties, state) {
  console.log("properties", properties);
  const yAxisStart = 0;
  let yAxisEnd = 0;
  let totalVisitCount = 0;
  state.map((site) => {
    totalVisitCount += site.visits;
    if (site.visits > yAxisEnd) {
      yAxisEnd = site.visits;
    }
    return yAxisEnd;
  });
  console.log("totalVisitCount", totalVisitCount);
  const updatedState = [];

  state.map((site) => {
    let sites = site.visits / 510738;
    if (sites > .01) {
      updatedState.push({
        domain: site.domain,
        visits: site.visits,
      });
    }
  });



  const x = d3.scaleBand().rangeRound([0, properties.width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([properties.height, 0]);

  x.domain(updatedState.map(d => d.domain));
  y.domain([0, d3.max(updatedState, (d) => {
    console.log("d.visits", d.domain, d.visits);
    return d.visits}
    )]);

  properties.svg
    .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + (properties.height) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function (d) {
        return "rotate(-30)";
      });      

  properties.svg
    .append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))      
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  properties.svg
      .selectAll(".bar")
      .data(updatedState)
      .enter()
    .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.domain))      
      .attr("y", d => y(d.visits))      
      .attr("width", x.bandwidth())
      .attr("height", d => properties.height - y(d.visits));

  const xScale = null;
  const yScale = null;
  console.log("axis percent - ", yAxisStart, " - ", yAxisEnd);
  console.log("updatedState - ", updatedState);
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
  // console.log("data", data)
  // max = getMax;
  // console.log("max: ", max, maxSiteName);

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
     .attr('y', d => (h - d.visits))
     .attr('width', 8)
     .attr('height', d => (d.visits));

  const tooltipD3 = d3.select(el)
    .append('div')
    .attr('class', 'bar-graph-tooltipD3');

  tooltipD3.append('div')
    .attr('class', 'bar-domain-name');

  tooltipD3.append('div')
    .attr('class', 'bar-visits');

  // bars
  //   .transition()
  //   .duration(2000)
  //   .delay(100)
  //   .attr('y', d =>
  //     h - (d.visits / 6) // Height minus data value
  //   )
  //   .attr('height', d =>
  //      d.visits / 6
  //   );

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