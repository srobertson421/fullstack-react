import React, { Component } from 'react';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/chat');

    this.socket.onopen = (event) => {
      //this.socket.send('Connected!!');
    }

    this.socket.onmessage = (event) => {
      let tempMessages = this.state.messages;
      tempMessages.push(event.data);
      this.setState({messages: tempMessages});
    }
  }

  render() {
    let messages = this.state.messages.map((message, index) => {
      return <div key={index}>{message}</div>
    });

    return (
      <div>
        <h1>Chat Page</h1>
        <form onSubmit={(event) => {this.sendMessage(event)}}>
          <input type="text" name="message" placeholder="Enter message" />
        </form>
        {messages}
      </div>
    );
  }

  sendMessage(event) {
    event.preventDefault();
    let message = event.target.message.value;
    this.socket.send(message);
    event.target.message.value = '';
  }
}

export default ChatContainer;
