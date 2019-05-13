import React, { Component } from 'react';

import './NoteReport.css';

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
