import React, { Component } from 'react';

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
    let { jobId } = this.props.match.params;

    fetch(`/api/jobs/${jobId}`)
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
      );

    fetch(`/api/jobs/${jobId}/log`)
      .then((response) => response.json())
      .then(
        (log) => {
          this.setState({
            stackLoaded: true,
            stacks: log,
          });
        },
        (error) => {
          this.setState({
            jobLoaded: true,
            error,
          });
        }
      );
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
        <div>
          <h2>{jobDetails.revision}</h2>
          <div>groupId: {jobDetails.build_tag}</div>
          <div>taskId: {jobDetails.test_tag}</div>
          <div>status: {jobDetails.job_status}</div>
          <div>flags: {jobDetails.build_flags}</div>
          <div>date: {jobDetails.created_at.split('T')[0]}</div>
          <div>time: {jobDetails.created_at.split('T')[1].split('.')[0]}</div>

          {stacks.map((node) => (
            <div>
              <p>
                {node.frequency} - {node.nt_call}
              </p>
              <p>{node.short_frames + node.long_frames}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}
