import React, { Component } from 'react';

import AuthService from '../services/auth-service';
import AdminLoginForm from '../components/AdminLoginForm';

class AdminContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: AuthService.isLoggedIn(),
      user: AuthService.currentUser()
    }
  }

  render() {
    let adminView;
    if(this.state.loggedIn) {
      adminView = <h1>Admin Page! {this.state.user.email}</h1>
    } else {
      adminView = <AdminLoginForm login={(event) => {this.login(event)}}></AdminLoginForm>
    }

    return (
      <div>
        {adminView}
      </div>
    );
  }

  login(event) {
    var userInfo = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      AuthService.saveToken(res.token);
      this.setState({loggedIn: true, user: res.user});
    });
  }
}

export default AdminContainer;