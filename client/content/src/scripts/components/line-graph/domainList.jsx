import React from 'react';

class DomainList extends React.Component {
  constructor(props) {
    super(props);

    //add selected value to store 
    this.state = {
      'selected-value': '',
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.domains.length > 0) {

      console.log('data has been passed to domainList', nextProps.domains);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        Domain List 1: <select>
          {this.props.domains.map((domain) =>
            <option value={this.props.domain}> {domain} </option>
          )}
        </select>

      </div>
    );
  }
}

export default DomainList;
