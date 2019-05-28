import React, { Component } from 'react';

import './JobList.css';

export default class JobList extends Component {
  render() {
    const { jobs } = this.props;

    if (jobs.length !== 0) {
      return (
        <div className="job_list">
          <ul>
            {jobs
              .sort((a, b) => {
                return a.frequency - b.frequency;
              })
              .map((job) => (
                <li className="job_listing" key={job.id.toString()}>
                  <a href={`/jobs/listing/${job.id}`}>
                    {job.revision.split('=')[2]}
                  </a>
                  <p>{job.job_status}</p>
                  <p>{job.created_at.split('T')[0] || 0}</p>
                </li>
              ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="job_list">
          <ul>
            <li>no jobs found</li>
          </ul>
        </div>
      );
    }
  }
}
