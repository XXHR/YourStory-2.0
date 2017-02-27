import React from 'react';
import ReactDOM from 'react-dom';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);

    console.log('initial props in Graph', props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('props in graph', nextProps);

    if (nextProps.endDate) {

      const el = ReactDOM.findDOMNode(this);
      console.log('React DOM Node', el);

      const props = { top: 20, right: 80, bottom: 20, left: 50 }
      const data = this.props;

      d3LineGraph.create(el, props, nextProps);

      return true;

    } else {
      return false;
    }
  }

  render() {
    return (
      <div className='lineGraph'>
        HELLURRR
    
      </div>
    )
  }


}

export default Graph;
