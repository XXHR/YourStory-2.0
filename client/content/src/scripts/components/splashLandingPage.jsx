import React from 'react';
import Footer from './footer';

export default class SplashLandingPage extends React.Component { 
  render() {
    return (
      <div>
        <center id="splash-header">
          <img src="./assets/logos/logo-full-size.png" id="splash-header-logo" />
        </center>

        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <div id="splash-inner-content">
              <div className="row">
                <div className="col-sm-6">
                  <img src="./assets/ChromeYourStory.png" width="400px" />
                </div>
                <div className="col-sm-6">
                  <table>
                    <tbody>
                      <tr className="splash-inner-header-table-row">
                      <td className="splash-inner-header-table-cell">
                        <h1>YourStory</h1>
                      </td>
                      <td className="splash-inner-header-table-cell">
                        <h4>for</h4>
                      </td>
                      <td>
                        <h1>Chrome</h1>
                      </td>
                    </tr>
                    </tbody>                    
                  </table>

                  <p>Installing the YourStory browser extension allows you to visualize your browsing history each time you open a new tab on Chrome.<a href="https://chrome.google.com/webstore/detail/your-story/jdcimfeoliipgbnpmbbnnojlpehbdflh?authuser=3">Chrome Store</a></p>
                  <button className="btn btn-install">INSTALL</button>
                  <p id="install-url">install the extension</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <center id="splash-header">
          <p id="install-url"> © 2016 YourStory | Shipped from San Francisco CA </p>
        </center>
      </div>
    );
  }
}
