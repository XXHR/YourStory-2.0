import React from 'react';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);

    console.log('initial props in Graph', props);
  }

  componentDidMount() {
    const el = React.findDomNode(this);
    const props = { top: 20, right: 80, bottom: 20, left: 50 }

    d3LineGraph.create(el, )
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
