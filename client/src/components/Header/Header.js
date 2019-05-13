import React, { Component } from 'react';

import NoteReport from '../NoteReport/NoteReport';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <p>Header</p>
        <NoteReport note={this.props.note} />
      </div>
    );
  }
}

export default Header;
