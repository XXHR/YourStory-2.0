import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component { 
  componentDidMount() {    
    // document.addEventListener('click', () => {
    //   this.props.dispatch({
    //     type: 'ADD_COUNT',
    //   });
    // });
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'user-clicked-alias',
      });
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
  console.log("inside App.js: ", state);
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);