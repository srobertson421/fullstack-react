import React, { Component } from 'react';

import PostsList from '../components/PostsList';

class HomeContainer extends Component {
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
        <PostsList posts={this.state.posts}></PostsList>
      </div>
    );
  }
}

export default HomeContainer;