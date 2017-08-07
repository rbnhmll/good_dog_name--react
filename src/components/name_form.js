import React, { Component } from 'react';

class NameForm extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <form
        className="inputs"
        onSubmit={this.props.submitName}
      >
        <input id="nameInput" type="text" />
        <input type="submit" value="Name it!"/>
      </form>
    );
  }
}

export default NameForm;
