import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import axios from 'axios';

import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import LobbyContainer from './containers/LobbyContainer';

import AuthForm from './components/AuthForm';
import AuthService from './services/auth-service';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: AuthService.currentUser(),
      loggedIn: AuthService.isLoggedIn(),
      formType: 'signup'
    }
  }

  componentWillMount() {
    this.authInterceptor = axios.interceptors.request.use((config) => {
      console.log(config);
      return config
    }, (error) => {
      return Promise.reject(error);
    });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.authInterceptor);
  }

  render() {
    let view;
    let handler;
    if(!this.state.loggedIn) {
      if(this.state.formType === 'signup') {
        handler = (event) => {this.signup(event)}
      } else {
        handler = (event) => {this.login(event)}
      }
      view = (<AuthForm version={this.state.formType} handler={handler} switchForm={(event) => {this.switchForm(event)}}></AuthForm>);
    } else {
      view = (
        <div>
          <button onClick={(event) => {this.logout(event)}}>Logout</button>
          <Router history={browserHistory}>
            <Route path="/" component={HomeContainer}></Route>
            <Route path="/post/:id" component={PostContainer}></Route>
            <Route path="/lobby/:id" component={LobbyContainer}></Route>
          </Router>
        </div>
      );
    }

    return view;
  }

  switchForm(event) {
    let formType = this.state.formType;
    if(formType === 'signup') {
      formType = 'login';
    } else {
      formType = 'signup';
    }
    this.setState({formType: formType});
  }

  login(event) {
    var userInfo = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post('/api/auth/login', userInfo).then((res) => {
      AuthService.saveToken(res.data.token);
      this.setState({loggedIn: true, user: res.data.user});
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(event) {
    console.log(this);
    var userInfo = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    axios.post('/api/auth/signup', userInfo).then((res) => {
      AuthService.saveToken(res.data.token);
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

export default App;
