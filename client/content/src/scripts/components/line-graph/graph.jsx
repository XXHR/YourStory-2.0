import React from 'react';
import ReactDOM from 'react-dom';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);

    console.log('initial props in Graph', props);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    const margin = { top: 20, right: 10, bottom: 20, left: 60 }
    // const data = nextProps;

    d3LineGraph.create(el, margin, this.props);
  }

  shouldComponentUpdate(nextProps) {
    console.log('next props in graph: ', nextProps.startDate, nextProps.endDate);
    if (nextProps.selectedDomains) {

      console.log('selectedDomains', nextProps.selectedDomains)

      d3LineGraph.update(nextProps);

      return true;
    } else {
      return;
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