import React, { Component } from 'react';
import {init as firebaseInit, database} from '../scripts/firebase';

import Results from './results';

class NameForm extends Component {
  constructor() {
    super();
    firebaseInit();
    this.state = {
      showResults: false,
    }
    this.submitName = this.submitName.bind(this);
    this.formReset = this.formReset.bind(this);
  }

  submitName(e) {
    e.preventDefault();
    this.setState({ showResults: true });
    const animalId = this.props.animalObj.id;
    const dbRef = database.ref();
    dbRef.child(this.props.animalObj.id).update({
      imageObj: this.props.animalObj,
      animalName: this.props.animalName,
    });
  }

  formReset() {
    this.props.nameAgain();
    this.setState({ showResults: false });
  }

  render() {
    return (
      <div className="app-box">
        {
          !this.state.showResults ?
          <div>
            <h1>What do you think this {this.props.animal}'s name is?</h1>
            <form
              className="inputs"
              onSubmit={this.submitName}
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
        :
          <Results
            reset={this.formReset}
            animal={this.props.animal}
            animalName={this.props.animalName}
          />
        }
      </div>
    );
  }
}

export default NameForm;
