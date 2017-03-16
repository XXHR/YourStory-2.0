'use strict'
import * as d3 from 'd3';
import catParser from './categoriesList';

const d3Chart = {};

d3Chart.create = function (el, props) {
  const reduceData = props.reduce((accum, value) => {
    return accum + value.totalCount;
  }, 0);

  const datasetCreator = ((data) => {
    const updatedData = [];
    if (data[0] === 'secondset') return data[1];
    data.map((item) => {
      if (((item.totalCount / reduceData) * 100) > 1) {
        updatedData.push({
          label: catParser[item.category],
          count: item.totalCount,
          domains: item.domains,
        });
      }
    });

    return updatedData;
  });

  const dataset = datasetCreator(props);
  const width = 450;
  const height = 320;
  const radius = Math.min(width, height) / 2;
  const donutWidth = 60;
  const colorArray = [
    'rgb(84, 135, 182)',
    'rgb(98, 140, 184)',
    'rgb(155, 159, 191)',
    'rgb(170, 163, 192)',
    'rgb(227, 182, 199)',
    'rgb(241, 187, 201)',
    'rgb(255, 192, 203)'];
  const color = d3.scaleOrdinal(d3.schemeCategory20b);

  const svg = d3.select(el)
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'catDataSVG')
    .append('g')
      .attr('transform', 'translate(' + (width / 2.75) +
        ',' + (height / 2 ) + ')');

  // create radius function
  const arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius)
    .padAngle(0.013)
    .cornerRadius(0);

  // create angles function
  const pie = d3.pie()
    .value((d => d.count))
    .sort(null);

  let tooltipD3 = d3.select(el)
    .append('div')
    .attr('class', 'tooltipD3');

  tooltipD3.append('div')
    .attr('class', 'label');

  tooltipD3.append('div')
    .attr('class', 'count');

  tooltipD3.append('div')
    .attr('class', 'percent');

  const path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', ((d, i) => {
      return color(d.data.label);
    }));

  const legendRectSize = 10;
  const legendSpacing = 5;

  const legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => {
      const height = legendRectSize + legendSpacing;
      const offset =  height * color.domain().length / 2;
      const horz = 18 * legendRectSize;
      const vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing + 3)
    .text(d => d);

  path.transition()
    .duration(2000)
    .attrTween('d', function(d) {
      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
      return function(t) {
        return arc(interpolate(t));
      };
    });

  path.on('mouseover', ((d) => {
    const total = d3.sum(dataset.map((d) => {
      return d.count;
    }));
    const percent = Math.round(1000 * d.data.count / total) / 10;
    svg.select('.domain');
    tooltipD3.select('.label').html(d.data.label);
    tooltipD3.select('.count').html(d.data.count);
    tooltipD3.select('.percent').html(percent + '%');
    tooltipD3.style('display', 'block');
  }));

  path.on('mouseout', (() => {
    tooltipD3.style('display', 'none');
  }));

  path.on('click', d => {
    // console.log("d", d.data.label);
    const newDomainData = [];
    const noDuplicatesObj = {};
    const color = d3.scaleOrdinal(d3.schemeCategory20b);

    d.data.domains.map((domainObj) => {
      if (!noDuplicatesObj[domainObj.label]) {
        noDuplicatesObj[domainObj.label] = domainObj.count;
      } else {
        noDuplicatesObj[domainObj.label] =  noDuplicatesObj[domainObj.label] + domainObj.count;
      }
    });

    for (let key in noDuplicatesObj) {
      newDomainData.push({
        label: key,
        count: noDuplicatesObj[key],
      });
    }

    d3.selectAll('.legend').remove();
    svg.selectAll('path').remove();
    d3.select('#catDataChart').selectAll('svg').remove();
    d3.select('.tooltipD3').remove();
    d3.selectAll('text').remove();
    const ele = d3.select('#catDataChart');    
    d3.select('#catDataChart')
      .append('text')
      .text('Category: ' + d.data.label);
    console.log("ele", ele._groups[0][0]);
    d3Chart.create(ele._groups[0][0], ['secondset', newDomainData]);
    // this.createDomainPie(d, svg, pie, arc, tooltipD3);
  });
};

// d3Chart.createDomainPie = function (d, svg, pie, arc, tooltipD3) {
//   const newDomainData = [];
//   const noDuplicatesObj = {};
//   const color = d3.scaleOrdinal(d3.schemeCategory20b);

//   d.data.domains.map((domainObj) => {
//     if (!noDuplicatesObj[domainObj.label]) {
//       noDuplicatesObj[domainObj.label] = domainObj.count;
//     } else {
//       noDuplicatesObj[domainObj.label] =  noDuplicatesObj[domainObj.label] + domainObj.count;
//     }
//   });

//   for (let key in noDuplicatesObj) {
//     newDomainData.push({
//       label: key,
//       count: noDuplicatesObj[key],
//     });
//   }

//   const temp = svg.selectAll('path')
//    .data(pie(newDomainData));

//   temp
//     .attr('d', arc)
//     .attr('fill', ((d, i) => {
//       return color(d.data.label);
//     }))
//     .transition()
//     .duration(2000)
//     .attrTween('d', (d) => {
//       var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//       return (t) => {
//         return arc(interpolate(t));
//       };
//     });

//   temp
//     .enter()
//     .append('path')
//     .attr('d', arc)
//     .attr('fill', ((d, i) => {
//       return color(d.data.label);
//     }))
//     .transition()
//     .duration(2000)
//     .attrTween('d', ((d) => {
//       const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
//       return (t) => {
//         return arc(interpolate(t));
//       };
//     }));

//   const legendRectSize = 10;
//   const legendSpacing = 5;

//   const legend = svg.selectAll('.legend')
//     .data(color.domain())
//     .enter()
//     .append('g')
//     .attr('class', 'legend')
//     .attr('transform', (d, i) => {
//       const height = legendRectSize + legendSpacing;
//       const offset =  height * color.domain().length / 2;
//       const horz = 18 * legendRectSize;
//       const vert = i * height - offset;
//       return 'translate(' + horz + ',' + vert + ')';
//     });

//   legend.append('rect')
//     .attr('width', legendRectSize)
//     .attr('height', legendRectSize)
//     .style('fill', color)
//     .style('stroke', color);

//   legend.append('text')
//     .attr('x', legendRectSize + legendSpacing)
//     .attr('y', legendRectSize - legendSpacing + 3)
//     .text(d => d);

//   temp.on('mouseover', (() => {
//     console.log("mouseover");
//     const total = d3.sum(newDomainData.map((d) => {
//       return d.count;
//     }));
//     const percent = Math.round(1000 * d.data.count / total) / 10;
//     svg.select('.domain');
//     tooltipD3.select('.label').html(d.data.label);
//     tooltipD3.select('.count').html(d.data.count);
//     tooltipD3.select('.percent').html(percent + '%');
//     tooltipD3.style('display', 'block');
//   }));

//   temp.on('mouseout', (() => {
//     console.log("mouseout");
//     tooltipD3.style('display', 'none');
//   }));
// };

d3Chart.update = function (el, props) {
  this.destroy();
  this.create(el, props);
};

d3Chart.destroy = function () {
  const el = d3.select('#catDataSVG');
  const oldTooltips = d3.select('.tooltipD3');
  el.remove();
  oldTooltips.remove();
  d3.selectAll('text').remove();
};


module.exports = d3Chart;
