import React, { Component } from 'react';

import PostsList from './components/PostsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    fetch('/api/posts').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({posts: res});
    });
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <PostsList posts={this.state.posts}></PostsList>
      </div>
    );
  }
}

export default App;
