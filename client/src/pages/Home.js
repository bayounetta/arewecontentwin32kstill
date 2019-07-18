import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { task: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let myInit = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: this.state.task,
      }),
    };

    fetch('/api/jobs', myInit)
      .then((jsonResponse) => {
        console.log(jsonResponse);
        this.setState({
          task: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="Page">
        <form>
          <label>
            Create a new job a taskID <br />
            <span className="tiny">
              (remember to{' '}
              <a href="https://www.github.com/metalcanine/arewecontentwin32kstill/wiki/Guide">
                upload
              </a>{' '}
              symbols first!)
            </span>
          </label>
          <input
            type="text"
            name="task"
            ref="task"
            value={this.state.task}
            onChange={this.handleChange}
          />
          <input
            onClick={this.handleSubmit}
            className="submit"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    );
  }
}
