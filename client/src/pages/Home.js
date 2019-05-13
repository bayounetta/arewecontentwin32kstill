import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { groupID: '', taskID: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      groupID: event.target.groupID,
      taskID: event.target.taskID,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Searching for job ' + this.state.taskID);
    console.log(this.state.taskID);
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <form>
          <label>groupID</label>
          <input
            type="text"
            value={this.state.groupID}
            onChange={this.handleChange}
          />
          <label>taskID</label>
          <input
            type="text"
            value={this.state.taskID}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
