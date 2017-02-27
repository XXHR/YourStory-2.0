//d3 Line Graph object
import * as d3 from 'd3';

const d3LineGraph = {

  create(el, props, state) {
    const margin = props;
    // make svg
    const svg = d3.select(el).append('svg')
      .attr('class', 'history-by-date')

    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g')
       .attr('class', 'graph')
       .attr("transform", "translate(" + 0 + "," + margin.top + ")")

    const propsForAxis = { width, height };

    this.update(g, propsForAxis, state);
  },


  update(el, props, state) {
    // recompute the scales for x,y axis
    const axis = this.renderAxis(el, props, state);

    // render 
  },

  destroy(el) {

  },

  renderAxis(el, props, data) {
    const width = props.width;
    const height = props.height;

    // x axis
    const xAxis = d3.scaleTime().domain([new Date(data.endDate.year, data.endDate.month, data.endDate.date), new Date(data.startDate.year, data.startDate.month, data.startDate.date)]).range([0, width]);

    el.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xAxis))
        .attr('x', 40)
        .attr('y', 30)
        .attr('dx', '0.71em')
        .attr('fill', '#000')
        .append('text')
          .text('Days');
      // .attr('fill', '#000')

    // y axis
    const yAxisLeft = d3.scaleLinear().domain([data.min, data.max]).range([height, 0]);

    el.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yAxisLeft))
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .append('text') 
          .text('Visit Count');
      // .attr('fill', '#000')
   
  },

  makeLine(el, scale, data) {

  }


}

export default d3LineGraph;
