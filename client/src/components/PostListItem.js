import React, { Component } from 'react';
import { Link } from 'react-router';

class PostListItem extends Component {
  render() {
    return (
      <div>
        <Link to={{pathname: `/post/${this.props.post._id}`}}>{this.props.post.title}</Link>
      </div>
    );
  }
}

export default PostListItem;