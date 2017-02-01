import React, { Component } from 'react';

class AdminLoginForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={(event) => {event.preventDefault(); this.props.login(event)}}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter email" />
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AdminLoginForm;