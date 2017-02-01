import React, { Component } from 'react';

class PostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    let postId = this.props.params.id;
    fetch(`/api/posts/${postId}`).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({post: res});
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <p>{this.state.post.content}</p>
      </div>
    );
  }
}

export default PostContainer;