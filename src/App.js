import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Switcher from './components/switcher'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switcher />
      </div>
    );
  }
}

export default App;
