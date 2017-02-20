import React from 'react';
import Line from './line';

class XYAxis extends React.Component {

  constructor(props) {
    super(props);

    console.log('props for XY Axis', props);

    this.state = {
      dates: [],
    }
  }

  componentDidMount() {
    let dates = [];
      for (let domain in this.props.data) {
        for (let domainDay of this.props.data[domain]) {
          dates.push(domainDay.date.slice(0, 10));
          this.setState({ dates });
          console.log('xyaxis state', this.state);
        }
      }
  }



  render() {
    return (
     <div id="graph">
        XY Axis goes hurr
        <svg width="960" height="200" className="graph-svg"></svg>
      </div>
    )
  }

}

export default XYAxis;
