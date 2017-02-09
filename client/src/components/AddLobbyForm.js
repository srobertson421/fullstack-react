import React, { Component } from 'react';

class AddLobbyForm extends Component {
  render() {
    return (
      <div>
        <h2>Add Lobby</h2>
        <form onSubmit={(event) => {this.props.submitLobby(event)}}>
          <label>Lobby Title</label>
          <input type="text" name="title" placeholder="Enter a title for the lobby" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddLobbyForm;
