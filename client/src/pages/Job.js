import React, { Component } from 'react';

export default class Job extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      jobDetails: {},
    };
  }

  componentDidMount() {
    fetch(`/api/jobs/${this.props.match.params.jobId}`)
      .then((response) => response.json())
      .then(
        (job) => {
          this.setState({
            isLoaded: true,
            jobDetails: job,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { jobDetails } = this.state;
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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
        </div>
      );
    }
  }
}
