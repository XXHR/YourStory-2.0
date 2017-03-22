import React from 'react';
import ReactDOM from 'react-dom';
import d3LineGraph from './d3LineGraph';

class Graph extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    const margin = { top: 20, right: 10, bottom: 20, left: 60 }

    d3LineGraph.create(el, margin, this.props);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {

      console.log('Graph comp updated: ', nextProps);

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
