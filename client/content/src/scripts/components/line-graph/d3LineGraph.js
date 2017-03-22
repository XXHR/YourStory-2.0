//d3 Line Graph object
import * as d3 from 'd3';


const d3LineGraph = {

  svg: null,

  parentg: null,

  axisg: null,

  width: null,

  height: null,

  xScale: null,

  yScale: null,

  create(el, properties, state) {

    const margin = properties;
        
    this.width = 900;
    this.height = 400;

    this.svg = d3.select(el).append('svg')
      .attr('width', this.width + margin.left + margin.right)
      .attr('height', this.height + margin.top + margin.bottom);

    this.parentg = this.svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.axisg = this.parentg.append('g')
      .attr('class', 'axis-parent-g');

    // const widthHeight = { width: this.width, height: this.height };

    // this.renderAxis(this.g, widthHeight, state);

    this.renderXAxis(state.startDate, state.endDate);
    this.renderYAxis(state.max, state.min);
  },

  update(state) {
    this.renderYAxis(state.max, state.min);
    this.renderDomainLines(state.selectedDomains);
  },

  renderYAxis(max, min) {
    d3.select('.y').remove();

    if (max === min) {
      min = 0;
    }

    this.yScale = d3.scaleLinear()
      .domain([min, max])
      .range([this.height, 0]);

    const yAxis = d3.axisLeft(this.yScale);

      // add y axis
    this.axisg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  },

  renderXAxis(startDate, endDate) {
    // [year-month-day]
    const minDate = new Date(endDate.year, endDate.month - 1, endDate.day);
    const maxDate = new Date(startDate.year, startDate.month - 1, startDate.day);

    this.xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, this.width]);

    const xAxis = d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%Y-%m-%d'));

    // add x axis
    this.axisg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis)    
  },

  // renderAxis(el, properties, data) {
  //   const startDate = data.startDate;
  //   const endDate = data.endDate;
  //   const min = data.min;
  //   const max = data.max;

  //   // [year-month-day]
  //   const minDate = new Date(endDate.year, endDate.month - 1, endDate.day);
  //   const maxDate = new Date(startDate.year, startDate.month - 1, startDate.day);

  //   this.xScale = d3.scaleTime()
  //     .domain([minDate, maxDate])
  //     .range([0, properties.width]);

  //   this.yScale = d3.scaleLinear()
  //     .domain([min, max])
  //     .range([properties.height, 0]);

  //   const xAxis = d3.axisBottom(this.xScale)
  //     .tickFormat(d3.timeFormat('%Y-%m-%d'));

  //   const yAxis = d3.axisLeft(this.yScale);

  //   // add x axis
  //   el.append('g')
  //     .attr('class', 'x axis')
  //     .attr('transform', 'translate(0,' + properties.height + ')')
  //     .call(xAxis)

  //   // // add y axis
  //   el.append('g')
  //     .attr('class', 'y axis')
  //     .call(yAxis);
    
  // },

  renderDomainLines(data) {

    const domainId = data[0];
    const domain = data[1];

    const xScale = this.xScale;
    const yScale = this.yScale;

    const domainLine = d3.line()
            .x((d) => {
              return xScale(new Date(d.date));
             })
            .y((d) => {
              return yScale(d.count);
            });

    const domainStyling = {
      1: '#909BBD',
      2: '#8DB8CB',
      3: '#DAB4C6'
    }

    for (let domainName in domain) {

      const domainColor = domainStyling[domainId];
      
      d3.select('#domainId-' + domainId).remove();

      const domainG = this.parentg.append('g')
                      .attr('id', 'domainId-' + domainId);

      domainG.append('path')
        .attr('id', 'domain-line-' + domainId)
        .style("stroke", domainColor)
        .style("fill", 'none')
        .style("stroke-width", '2px')
        .attr('d', domainLine(domain[domainName]));

      domainG.append('text')
          // .attr('id', domainName)
          .attr('transform', 'translate(' + (this.width - 100) + ',' + yScale(domain[domainName][3].count) + ')')
          .attr('dy', '.35em')
          .attr('text-anchor', 'start')
          .style('fill', domainColor)
          .text(domainName);

      domainG.selectAll('domainDots-' + domainId)
        .data(domain[domainName])
          .enter().append('circle')
            .attr('class', 'domain-circle-' + domainId)
            .attr('r', 6)
            .attr('cx', (d) => { return xScale(new Date(d.date)); })
            .attr('cy', (d) => { return yScale(d.count); })
            .style('fill', domainColor)
    }

  },

  destroy() {
    this.svg.remove();
  },

  checkDomainCount() {
    return this.domainCount;
  }

}

export default d3LineGraph;
