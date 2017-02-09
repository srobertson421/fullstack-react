import React, { Component } from 'react';
import axios from 'axios';

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

    axios.post('/auth/login', userInfo)
    .then((res) => {
      AuthService.saveToken(res.token);
      this.setState({loggedIn: true, user: res.data.user});
    }).catch((error) => {
      console.log(error);
    });
  }

  logout(event) {
    AuthService.removeToken();
    this.setState({loggedIn: AuthService.isLoggedIn(), user: AuthService.currentUser()});
  }
}

export default AdminContainer;
