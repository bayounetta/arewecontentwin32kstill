import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';

import Home from './pages/Home';
import Jobs from './pages/JobList';
import About from './pages/About';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/about">About</Link>

        <Route exact path="/" component={Home} />
        <Route path="/jobs" component={Jobs} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}

export default App;
