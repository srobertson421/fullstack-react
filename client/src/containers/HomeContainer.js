import React, { Component } from 'react';

import LobbyList from '../components/LobbyList';
import AddLobbyForm from '../components/AddLobbyForm';
import AuthService from '../services/auth-service';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lobbies: []
    }
  }

  componentDidMount() {
    fetch('/api/lobbies').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({lobbies: res});
    });
  }

  render() {
    return (
      <div>
        <AddLobbyForm submitLobby={(event) => {this.submitLobby(event)}}></AddLobbyForm>
        <LobbyList lobbies={this.state.lobbies}></LobbyList>
      </div>
    );
  }

  submitLobby(event) {
    event.preventDefault();
    let lobby = {
      title: event.target.title.value,
      players: [AuthService.currentUser()],
      gameStarted: false
    }

    event.target.title.value = '';

    fetch('/api/lobbies', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(lobby)
    }).then((res) => {
      return res.json();
    }).then((res) => {
      let tempLobbies = this.state.lobbies;
      tempLobbies.push(res);
      this.setState({lobbies: tempLobbies});
    });
  }
}

export default HomeContainer;
