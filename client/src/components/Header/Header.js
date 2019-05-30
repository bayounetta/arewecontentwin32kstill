import React, { Component } from 'react';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="title">
          <img src="/images/clean.svg" alt="a squeegee icon" />
          <a href="/" >AreWeContentWin32KStill?</a>
        </div>
        <p className="light">(yes, but we're getting there)</p>
      </div>
    );
  }
}
