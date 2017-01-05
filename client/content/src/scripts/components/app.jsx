import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component { 
  componentDidMount() {    
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'say-hello',
      })
    });    
  }

  render() {
    return (
      <div>        
        <div>count: {this.props.hello} </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hello: state.hello
  };
};

export default connect(mapStateToProps)(App);