import React from 'react';

class DomainList extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props.domains) !== JSON.stringify(nextProps.domains)) {

      console.log('data has been passed to domainList');
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        Domain List {this.props.id}: <select id={this.props.id} value={this.props.selectValue} onChange={this.props.handleChange}>
          {this.props.domains.map((domain, index) =>
            <option key={index} value={domain}> {domain} </option>
          )}
        </select>

      </div>
    );
  }
}

export default DomainList;
