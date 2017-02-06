import React, { Component } from 'react';
import LobbyListItem from './LobbyListItem';

class LobbyList extends Component {
  render() {
    let currentLobbies = this.props.lobbies.map((lobby, index) => {
      return <LobbyListItem key={lobby._id} lobby={lobby}></LobbyListItem>
    });

    return (
      <div>
        <h1>Lobbies</h1>
        {currentLobbies}
      </div>
    );
  }
}

export default LobbyList;
