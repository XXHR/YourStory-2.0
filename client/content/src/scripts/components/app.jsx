import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component { 
  componentDidMount() {    
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT',
      })
    });    
  }

  render() {
    return (
      <div>        
        <div>count: {this.props.count} </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);