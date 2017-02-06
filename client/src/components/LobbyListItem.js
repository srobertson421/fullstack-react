import React, { Component } from 'react';
import { Link } from 'react-router';

class LobbyListItem extends Component {
  render() {
    return (
      <div>
        <Link to={{pathname: `/lobby/${this.props.lobby._id}`}}>{this.props.lobby.title}</Link>
      </div>
    );
  }
}

export default LobbyListItem;
