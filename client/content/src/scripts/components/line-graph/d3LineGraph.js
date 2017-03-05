//d3 Line Graph object
import * as d3 from 'd3';

const d3LineGraph = {

  create(el, properties, state) {

    const margin = properties;
        
    const width = 1000;
    const height = 500;

    const svg = d3.select(el).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const widthHeight = { width, height };

    this.update(g, widthHeight, state);
  },

  update(el, properties, state) {
    // recompute the scales for x,y axis
    const axis = this.renderAxis(el, properties, state);

    // pass axis into ._renderLine
      // 
  },

  destroy(el) {

  },

  renderAxis(el, properties, data) {

    const startDate = data.startDate;
    const endDate = data.endDate;
    const min = data.min;
    const max = data.max;

    const minDate = new Date(endDate.year, endDate.month, endDate.day);
    const maxDate = new Date(startDate.year, startDate.month, startDate.day);

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([0, properties.width]);

    const yScale = d3.scaleLinear()
      .domain([min, max])
      .range([properties.height, 0]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%d-%m-%Y'));

    const yAxis = d3.axisLeft(yScale);

    // add x axis
    el.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + properties.height + ')')
      .call(xAxis)

    // add y axis
    el.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
    
  },

  makeLine(el, scale, data) {

  },


}

export default d3LineGraph;
