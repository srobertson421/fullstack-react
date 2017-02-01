import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import HomeContainer from './containers/HomeContainer';
import PostContainer from './containers/PostContainer';
import AdminContainer from './containers/AdminContainer';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={HomeContainer}></Route>
        <Route path="/post/:id" component={PostContainer}></Route>
        <Route path="/admin" component={AdminContainer}></Route>
      </Router>
    );
  }
}

export default App;
