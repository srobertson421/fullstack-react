import React, { Component } from 'react';

class PostListItem extends Component {
  render() {
    return (
      <div>{this.props.post.title}</div>
    );
  }
}

export default PostListItem;