//d3 Line Graph object
import * as d3 from 'd3';

const d3LineGraph = {

  create(el, props, state) {
    const margin = props;
    // make svg
    const svg = d3.select(el).append('svg')
      .attr('class', 'history-by-data')
      .attr('width') - margin.left - margin.right
      .attr('height') - margin.top - margin.bottom

    svg.append('g')
       .attr('class', 'axis');

    // this.update(el, state);
  },


  update(el, state) {
    // recompute the scales for x,y axis 
    const axis = this.renderAxis(el, state)
    // render 
  },

  destroy(el) {

  },

  renderAxis(el, data) {
    // select ''
    d3.select(el).
  },

  makeLine(el, scale, data) {

  }


}

export default d3LineGraph;
