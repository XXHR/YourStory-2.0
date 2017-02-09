import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';

export default class SplashLandingPage extends React.Component { 
  render() {
    return (
      <div>
        <center id="splash-header">
          <img id="splash-header-logo" src="./assets/logos/logo-full-size.png" id="splash-header-logo" role="presentation" />
        </center>

        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div id="splash-inner-content">
              <div className="row">
                <div className="col-sm-6">
                  <img src="./assets/ChromeYourStory.png" id="splash-chrome-yourstory-landing-img" role="presentation" />
                </div>
                <div className="col-sm-6">
                  <h1>YourStory <small>for</small> Chrome</h1>
                  <p>Installing the YourStory browser extension allows
                  you to visualize your browsing history each time you 
                  open a new tab on Chrome.</p>
                  <button className="btn btn-install" src="">INSTALL</button>
                  <p id="splash-install-url">install the extension</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <center id="splash-footer">
          <p id="splash-footer-innertext"> © 2016 YourStory | Shipped from San Francisco, CA </p>
        </center>
      </div>
    );
  }
}
