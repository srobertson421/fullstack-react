import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages
    }
  }

  componentDidMount() {
    this.socket = new WebSocket(`ws://${location.hostname}:3001/api/lobbies/${this.props.lobbyId}/chat/${this.props.user._id}`);
    this.socket.onopen = (event) => {
      this.socket.onmessage = (event) => {
        let tempMessages = this.state.messages;
        tempMessages.push(JSON.parse(event.data));
        this.setState({messages: tempMessages});
      }
    }
  }

  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }

  render() {
    let messages = this.state.messages.map((messageObj, index) => {
      return <div key={messageObj._id}>{messageObj.message}</div>
    }).reverse();

    return (
      <div>
        <form onSubmit={(event) => {this.sendMessage(event)}}>
          <input type="text" name="message" placeholder="Enter message" />
        </form>
        {messages}
      </div>
    );
  }

  sendMessage(event) {
    event.preventDefault();
    let message = `${this.props.user.email}: ${event.target.message.value}`;
    this.socket.send(message);
    event.target.message.value = '';
  }
}

export default Chat;
