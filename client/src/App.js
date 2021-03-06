import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }
  componentDidMount() {
    fetch('/api/home').then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({message: res.message});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          {this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
