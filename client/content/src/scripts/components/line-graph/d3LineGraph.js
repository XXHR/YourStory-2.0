//d3 Line Graph object
import * as d3 from 'd3';

const d3LineGraph = {

  svg: null,

  g: null,

  create(el, properties, state) {

    const margin = properties;
        
    const width = 900;
    const height = 400;

    this.svg = d3.select(el).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const widthHeight = { width, height };

    this.renderAxis(this.g, widthHeight, state);
  },

  xScale: null,

  yScale: null,

  update(state) {

    this.renderDomainLines(state.selectedDomains)
  },



  renderAxis(el, properties, data) {

    const startDate = data.startDate;
    const endDate = data.endDate;
    const min = data.min;
    const max = data.max;

    // [year-month-day]
    const minDate = new Date(endDate.year, endDate.month - 1, endDate.day);
    const maxDate = new Date(startDate.year, startDate.month - 1, startDate.day);

    console.log('minDate: ', minDate, 'maxDate: ', maxDate);

    this.xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, properties.width]);

    this.yScale = d3.scaleLinear()
      .domain([min, max])
      .range([properties.height, 0]);

    const xAxis = d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%Y-%m-%d'));

    const yAxis = d3.axisLeft(this.yScale);

    // add x axis
    el.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + properties.height + ')')
      .call(xAxis)

    // add y axis
    el.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // return xAxis, yAxis
    // return { xScale, yScale }
    
  },

  renderDomainLines(data) {
    // for every domain key in data, 
      // pass array of date/count objects into svg.append('path')
        // in .attr('d', domainLine) ===> domainLine being a function that maps x and y to date and count 
    const xScale = this.xScale;
    const yScale = this.yScale;

    const parseDate = d3.timeFormat('%d-%m-%Y');

    const domainLine = d3.line()
            .x((d) => {
              console.log('date x: ', d.date);
              return xScale(new Date(d.date));
             })
            .y((d) => {
              console.log('count y: ', d.count);
              return yScale(d.count);
            });

    const domainDotCx = (d) => {
      console.log('d in domainDotCx', d);
      return xScale(d.date);
    };

    const domainDotCy = (d) => {
      return yScale(d.count);
    }

    console.log('INSIDE renderDomainLines', data);

    const colors = ['#909BBD', '#DAB4C6', '#E8BFBB', '#8DB8CB', '#6B8EB9']

    data.forEach((domain) => {
      console.log('domain', domain);

      for (let domainName in domain) {
        console.log('domain name', domain[domainName]);

        // if domain has more than one data point, render path
        if (domain[domainName].length >= 2) {
          this.g.append('path')
                  .attr('class', 'domain-line')
                  .style("stroke", colors.pop())
                  .attr('d', domainLine(domain[domainName]));
        } else {
          console.log('domain CIRCLE: ', domain[domainName]);
          // if domain only has one data point, render circle
          this.g.append('circle')
            .attr('class', 'domain-circle')
            .attr('r', 5)
            .attr('cx', domainDotCx)
            .attr('cy', domainDotCy);
        }
      }
    });

  },

  destroy(el) {

  },

}

export default d3LineGraph;
