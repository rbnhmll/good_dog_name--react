import React, { Component } from 'react';
import './App.css';

import Switcher from './components/switcher'
import NameForm from './components/name_form'

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Switcher />
          <NameForm animal={this.props.match.params.animal} />
        </div>
      </div>
    );
  }
}

export default App;
