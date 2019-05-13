import React, { Component } from 'react';

import './NoteReport.css';

// TODO: after adding redux move error reporting here?
class NoteReport extends Component {
  render() {
    return (
      <div className="NoteReport">
        <p>{this.props.note}</p>
      </div>
    );
  }
}

export default NoteReport;
