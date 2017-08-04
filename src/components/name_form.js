import React, { Component } from 'react';

class NameForm extends Component {
  render() {
    return (
      <form className="inputs">
        <input id="nameInput" type="text" />
        <input type="submit" value="Name it!"/>
      </form>
    );
  }
}

export default NameForm;
