import React, { Component } from 'react';

import AuthService from '../services/auth-service';
import Chat from '../components/Chat';

class LobbyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lobby: {
        title: '',
        players: [],
        chatMessages: [],
        gameStarted: false
      }
    }
  }

  componentDidMount() {
    let lobbyId = this.props.params.id;
    fetch(`/api/lobbies/${lobbyId}`).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({lobby: res});
    });
  }

  render() {
    let currentPlayers = this.state.lobby.players.map((player) => {
      return <h3 key={player.id}>{player.email}</h3>
    });

    let chat;
    if(!this.state.lobby._id) {
      chat = <h4>Loading chat...</h4>
    } else {
      chat = <Chat lobbyId={this.state.lobby._id} user={AuthService.currentUser()} messages={this.state.lobby.chatMessages}></Chat>
    }

    return (
      <div>
        <h1>{this.state.lobby.title}</h1>
        {chat}
        {currentPlayers}
      </div>
    );
  }
}

export default LobbyContainer;
