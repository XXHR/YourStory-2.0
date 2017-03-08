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

    const minDate = new Date(endDate.year, endDate.month, endDate.day);
    const maxDate = new Date(startDate.year, startDate.month, startDate.day);

    this.xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, properties.width]);

    this.yScale = d3.scaleLinear()
      .domain([min, max])
      .range([properties.height, 0]);

    const xAxis = d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%d-%m-%Y'));

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
              let slicedDate = d.date.slice(0, 10);
              let formattedDate = new Date(slicedDate.slice(0, 4), slicedDate.slice(5, 7), slicedDate.slice(8))

              return xScale(formattedDate); 
             })
            .y((d) => { 
              console.log('typeof y: ', d.count) 
              return yScale(d.count); 
            });

    console.log('INSIDE renderDomainLines', data);

    data.forEach((domain) => {
      console.log('domain', domain);
      for (let domainName in domain) {
        console.log('domain name', domain[domainName]);
        this.svg.append('path')
                .attr('class', 'domain-line')
                .attr('d', domainLine(domain[domainName]));
      }
    })

  },

  destroy(el) {

  },

}

export default d3LineGraph;
