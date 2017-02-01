import React, { Component } from 'react';

import PostListItem from './PostListItem';

class PostsList extends Component {
  render() {
    let posts = this.props.posts.map((post) => {
      return <PostListItem key={post._id} post={post}></PostListItem>
    });

    return (
      <section>{posts}</section>
    );
  }
}

export default PostsList;