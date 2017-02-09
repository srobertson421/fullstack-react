import React, { Component } from 'react';

class AuthForm extends Component {
  render() {
    let title;
    let switchBtn;
    if(this.props.version === 'login') {
      title = <h1>Login</h1>;
      switchBtn = <button onClick={(event) => {this.props.switchForm(event)}}>Switch to Signup</button>;
    } else {
      title = <h1>Signup</h1>;
      switchBtn = <button onClick={(event) => {this.props.switchForm(event)}}>Switch to Login</button>;
    }

    return (
      <div>
        {title}
        {switchBtn}
        <form onSubmit={(event) => {event.preventDefault(); this.props.handler(event)}}>
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

export default AuthForm;
