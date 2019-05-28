import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import About from './pages/About';

import './styles/reset.css';
import './styles/global.css';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="router_block">
        <Router>
            <Link className="router" to="/">Home</Link>
            <Link className="router" to="/jobs">Jobs</Link>
            <Link className="router" to="/about">About</Link>

          <Route exact path="/" component={Home} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/about" component={About} />
        </Router>
      </div>
    </div>
  );
}
