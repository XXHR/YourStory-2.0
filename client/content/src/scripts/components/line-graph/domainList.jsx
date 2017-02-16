import React from 'react';

class DomainList extends React.Component {
  constructor(props) {
    super(props);

    //add selected value to store 
    this.state = {
      'selected-value': '',
    }
  }
  render() {
    return (
      <div>
        <select>
          {this.props.list.map((domain) =>
            <option value={this.props.domain}> {domain} </option>
          )}
        </select>

      </div>
    );
  }
}

export default DomainList;
