import React from 'react';
import ReactDOM from 'react-dom';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);

    console.log('initial props in graph component', props);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    const margin = { top: 20, right: 10, bottom: 20, left: 60 }
    // const data = nextProps;

    d3LineGraph.create(el, margin, this.props);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.selectedDomains) !== JSON.stringify(this.props.selectedDomains)) {
      console.log('GRAPH COMP NEW PROPS: ', nextProps);

      console.log('GRAPH COMP UPDATED W NEW DOMAINS: ', nextProps.selectedDomains);

      d3LineGraph.update(nextProps);

      return true;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    d3LineGraph.destroy();
  }


  render() {
    return (
      <div className='graph' id='graph'>
        
    
      </div>
    )
  }


}

export default Graph;
