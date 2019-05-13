import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Job from '../components/JobListing/JobListing';

export default class JobList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      latest: [],
      new: [],
      pending: [],
      complete: [],
    };
  }

  componentDidMount() {
    let fetchJobs = (jobType) =>
      fetch(`/api/jobs/${jobType}`)
        .then((response) => response.json())
        .then(
          (jobs) => {
            this.setState({
              isLoaded: true,
              [jobType]: jobs,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );

    fetchJobs('latest');
    fetchJobs('new');
    fetchJobs('pending');
    fetchJobs('complete');
  }

  render() {
    const { match } = this.props;
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h2>Job List</h2>
          <Link to={`${match.url}/latest`}>latest</Link>
          <Link to={`${match.url}/new`}>new</Link>
          <Link to={`${match.url}/pending`}>pending</Link>
          <Link to={`${match.url}/complete`}>complete</Link>

          <Route
            exact
            path={`${match.path}/latest`}
            render={() => <Job jobs={this.state.latest} />}
          />
          <Route
            path={`${match.path}/new`}
            render={() => <Job jobs={this.state.new} />}
          />
          <Route
            path={`${match.path}/pending`}
            render={() => <Job jobs={this.state.pending} />}
          />
          <Route
            path={`${match.path}/complete`}
            render={() => <Job jobs={this.state.complete} />}
          />
        </div>
      );
    }
  }
}
