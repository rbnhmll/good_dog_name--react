import React, { Component } from 'react';

class Switcher extends Component {
  render() {
    return (
      <label className="toggle">
				<input type="checkbox" />
				<span className="toggle-slider"></span>
			</label>
    );
  }
}

export default Switcher;
