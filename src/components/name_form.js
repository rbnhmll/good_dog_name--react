import React, { Component } from 'react';

class NameForm extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="app-box">
        <h1>What do you think this {this.props.animal}'s name is?</h1>
        <form
          className="inputs"
          onSubmit={this.props.submitName}
        >
          <input
            id="nameInput"
            type="text"
            name="animalName"
            onChange={this.props.setName}
            autoFocus
          />
          <input
            className="btn"
            type="submit"
            value="Name it!"
          />
        </form>
      </div>
    );
  }
}

export default NameForm;
