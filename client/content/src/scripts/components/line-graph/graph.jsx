import React from 'react';
import ReactDOM from 'react-dom';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);

    console.log('initial props in Graph', props);
  }

  shouldComponentUpdate(nextProps) {
    // FIX THIS CONDITIONAL 
    if (nextProps.endDate && JSON.stringify(nextProps.selectedDomains)) {

      console.log("next props graph: ", nextProps);

      const el = ReactDOM.findDOMNode(this);

      const margin = { top: 20, right: 10, bottom: 20, left: 60 }
      // const data = nextProps;

      d3LineGraph.create(el, margin, nextProps);

      return true;

    } else if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {

      return false;
    }
  }

  render() {
    return (
      <div className='graph'>
        
    
      </div>
    )
  }


}

export default Graph;
