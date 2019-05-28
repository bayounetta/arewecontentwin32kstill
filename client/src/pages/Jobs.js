import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import JobList from '../components/JobList/JobList';
import Job from '../components/Job/Job';

export default class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      latest: [],
      new: [],
      pending: [],
      complete: [],
      failing: [],
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
    fetchJobs('failing');
  }

  render() {
    const { match } = this.props;
    const { error, isLoaded } = this.state;

    if (error) {
      return <div className="Page">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="Page">Loading...</div>;
    } else {
      return (
        <div className="Page">
          <Link className="job_link" to={`${match.url}/latest`}>latest</Link>
          <Link className="job_link" to={`${match.url}/new`}>new</Link>
          <Link className="job_link" to={`${match.url}/pending`}>pending</Link>
          <Link className="job_link" to={`${match.url}/complete`}>complete</Link>
          <Link className="job_link" to={`${match.url}/failing`}>failing</Link>

          <Route
            exact
            path={`${match.path}/latest`}
            render={() => <JobList jobs={this.state.latest} />}
          />
          <Route
            path={`${match.path}/new`}
            render={() => <JobList jobs={this.state.new} />}
          />
          <Route
            path={`${match.path}/pending`}
            render={() => <JobList jobs={this.state.pending} />}
          />
          <Route
            path={`${match.path}/complete`}
            render={() => <JobList jobs={this.state.complete} />}
          />
          <Route
            path={`${match.path}/failing`}
            render={() => <JobList jobs={this.state.failing} />}
          />
          <Route
            path={`${match.path}/listing/:id`}
            component={Job}
          />
        </div>
      );
    }
  }
}
