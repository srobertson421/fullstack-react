import React, { Component } from 'react';

import AuthService from '../services/auth-service';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminDashboard from '../components/AdminDashboard';

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
      adminView = <div>
        <button onClick={(event) => {this.logout(event)}}>Logout</button>
        <AdminDashboard></AdminDashboard>
      </div>
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

  logout(event) {
    AuthService.removeToken();
    this.setState({loggedIn: AuthService.isLoggedIn(), user: AuthService.currentUser()});
  }
}

export default AdminContainer;