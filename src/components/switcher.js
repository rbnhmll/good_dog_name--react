import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class Switcher extends Component {
  constructor(props) {
    super();
    this.state = {
      isCat: window.location.pathname === "/cat" ? true : false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.checked) {
      window.location.pathname = '/cat';
    } else {
      window.location.pathname = '/dog';      
    }
  }
  
  render() {
    return (
      <label className="toggle">
				<input
          type="checkbox"
          name="isCat"
          checked={this.state.isCat}
          onChange={this.handleChange}
        />
				<span className="toggle-slider"></span>
			</label>
    );
  }
}

export default Switcher;
