import React, { Component } from 'react';

import './Job.css';

export default class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      jobLoaded: false,
      stackLoaded: false,
      jobDetails: {},
      stacks: [],
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;

    fetch(`/api/jobs/${id}`)
      .then((response) => response.json())
      .then(
        (job) => {
          this.setState({
            jobLoaded: true,
            jobDetails: job,
          });
        },
        (error) => {
          this.setState({
            jobLoaded: true,
            error,
          });
        }
      )
      .then(() => {
        return fetch(`/api/jobs/${id}/stacks`)
          .then((response) => response.json())
          .then(
            (stacks) => {
              this.setState({
                stackLoaded: true,
                stacks: stacks,
              });
            },
            (error) => {
              this.setState({
                jobLoaded: true,
                error,
              });
            }
          );
      });
  }

  render() {
    const { jobDetails, stacks } = this.state;
    const { error, jobLoaded, stackLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!jobLoaded && !stackLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="stack_list">
          <p>
            <a
              href={
                'https://hg.mozilla.org/try/rev/' +
                jobDetails.revision.split('=')[2]
              }
            >
              try revision link
            </a>
          </p>
          <p>
            <a href={'https://tools.taskcluster.net/tasks/' + jobDetails.task}>
              taskcluster {jobDetails.task}
            </a>
          </p>
          <p>
            <a href={jobDetails.revision}>
              treeherder {jobDetails.revision.split('=')[2].substring(0, 11)}
            </a>
          </p>
          <p>author: {jobDetails.author.split('@')[0]}</p>
          <p>status: {jobDetails.job_status}</p>
          <p>
            created:{' '}
            {
              jobDetails.created_at
                .split('T')
                .join(' ')
                .split('.')[0]
            }
          </p>
          <ul>
            {stacks.map((stack) => (
              <li className="stack_listing" key={stack.stack_id}>
                <p className="stack_title">
                  {stack.frequency} - {stack.nt_call}
                </p>
                {stack.short_frames.split('\n').map((frame) => (
                  <p>{frame}</p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
