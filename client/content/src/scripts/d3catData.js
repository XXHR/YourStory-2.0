'use strict'
import * as d3 from 'd3';

const d3Chart = {};

d3Chart.create = function (el, props) {
  const catParser = {
    uncategorized: 'Other',
    searchenginesandportals: 'Search Engines',
    newsandmedia: 'News',
    streamingmedia: 'Streaming Media',
    entertainment: 'Entertainment',
    shopping: 'Shopping',
    vehicles: 'Vehicles',
    gambling: 'Gambling',
    informationtech: 'Technology',
    games: 'Games',
    sports: 'Sports',
    economyandfinance: 'Economy & Finance',
    jobrelated: 'Jobs & Career',
    hacking: 'Hacking',
    messageboardsandforums: 'Forums',
    socialnetworking: 'Social Media',
    chatandmessaging: 'Chat & Instant Messaging',
    mediasharing: 'Media Sharing',
    blogsandpersonal: 'Blogs',
    health: 'Health',
    adult: 'Adult Content',
    personals: 'Dating',
    religion: 'Religion',
    travel: 'Travel',
    abortion: 'Abortion',
    education: 'Education',
    drugs: 'Drugs',
    alcoholandtobacco: 'Alcohol & Tobbaco',
    business: 'Business',
    advertising: 'Advertising',
    humor: 'Humor',
    foodandrecipes: 'Food & Recipes',
    realestate: 'Real State',
    weapons: 'Weapons',
    proxyandfilteravoidance: 'Proxy & Filter Avoidance',
    virtualreality: 'Virtual Reality',
    translators: 'Translators',
    parked: 'Parked Sites',
    illegalcontent: 'Illegal Content',
    contentserver: 'Content Servers',
  };
  // console.log("el in d3catData: ", el);
  // console.log("props in d3catData: ", props);

    const datasetCreator = ((data) => {
      return data.map((item) => {
        return { label: catParser[item.category],
                 count: item.totalCount,
                 domains: item.domains };
      });
    });

    const dataset = datasetCreator(props);
    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;
    const donutWidth = 55;
    const colorArray = [
      'rgb(84, 135, 182)',
      'rgb(98, 140, 184)',
      // 'rgb(113, 144, 185)',
      // 'rgb(127, 149, 187)',
      // 'rgb(141, 154, 189)',
      'rgb(155, 159, 191)',
      'rgb(170, 163, 192)',
      // 'rgb(184, 168, 194)',
      // 'rgb(198, 173, 196)',
      // 'rgb(212, 178, 198)',
      'rgb(227, 182, 199)',
      'rgb(241, 187, 201)',
      'rgb(255, 192, 203)'];
    
    const color = d3.scaleOrdinal(colorArray);                                           
    const svg = d3.select(el)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', 'catDataSVG')
      .append('g')
      .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2 ) + ')');

      const arc = d3.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius)
        .padAngle(0.013)
        .cornerRadius(0);

      let pie = d3.pie()
        .value(((d) => { return d.count; }))
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

      let path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', ((d, i) => {
          return color(d.data.label);
        }));

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
        svg.select('.domain').text(d.data.label + ': ' + percent + '%');
      }));

      path.on('mouseout', (() => {                              
        svg.selectAll('text').text("");
      }));

      path.on('click', d => {

        if(!d.data.domains){ console.log('Path.onClick: It should have been redirected'); return };


        let temp = svg.selectAll('path')
        .data(pie(d.data.domains))

        temp
          .attr('d', arc)
          .attr('fill', ((d, i) => {
            return color(d.data.label);
          }))
          .transition()
          .duration(2000)
          .attrTween('d', function(d) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t) {
              return arc(interpolate(t));
            };
          });

        temp.enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', ((d, i) => {
            return color(d.data.label);
          })).transition()
          .duration(2000)
          .attrTween('d', ((d) => {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function(t) {
              return arc(interpolate(t));
            };
          }));

        // d3.select('#refreshCatDataChart')
        //   .style('display', 'inline');
      });

      let newLabel = svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('class', 'domain')
        .text("")
      newLabel.on('click', (() => {
        console.log('clicked');
      }));
};

d3Chart.update = function (el, props) {
  this.destroy();
  this.create(el, props);
};

d3Chart.destroy = function () {
  const el = d3.select('#catDataSVG');
  const oldTooltips = d3.select('.tooltipD3');
  el.remove();
  oldTooltips.remove();
};

d3Chart._drawPoints = function (el, data) {

};

module.exports = d3Chart;
