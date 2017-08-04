import React, { Component } from 'react';
import './App.css';
import Switcher from './components/switcher'
import NameForm from './components/name_form'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switcher />
        <NameForm />
      </div>
    );
  }
}

export default App;
