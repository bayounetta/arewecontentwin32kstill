import React, { Component } from 'react';

import './JobListing.css';

class Job extends Component {
  render() {
    const { jobs } = this.props;

    if (jobs) {
      return (
        <div>
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                {job.revision} {job.job_status} {job.created_at.split('T')[0]}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>no jobs found</div>;
    }
  }
}

export default Job;
