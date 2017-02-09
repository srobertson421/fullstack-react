import React, { Component } from 'react';
import axios from 'axios';

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
    axios.get('/api/lobbies').then((res) => {
      this.setState({lobbies: res.data});
    }).catch((error) => {
      console.log(error);
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

    axios.post('/api/lobbies', lobby).then((res) => {
      let tempLobbies = this.state.lobbies;
      tempLobbies.push(res.data);
      this.setState({lobbies: tempLobbies});
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default HomeContainer;
