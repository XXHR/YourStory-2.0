import React from 'react';
import Footer from './footer';

export default class SplashLandingPage extends React.Component { 
  render() {
    return (
      <div className="container">
        <center>          
          <img src="./assets/logos/logo-full-size.png"/>
        </center>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <center id="splash-inner-content">
              <h1>Please download the extension from the <a href="https://chrome.google.com/webstore/detail/your-story/jdcimfeoliipgbnpmbbnnojlpehbdflh?authuser=3">Chrome Store</a></h1>
              hello            
            </center>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <center>          
          <Footer/>
        </center>
      </div>
    );
  }
}
