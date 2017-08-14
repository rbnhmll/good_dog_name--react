import React, { Component } from 'react';

import { getRandomNum } from './helpers';

class Results extends Component {
  constructor(props) {
    super();
    this.state = {
      animal: props.animal,
      animalName: props.animalName,
    }

    const animalName = props.animalName;
    const animal = props.animal;
    console.log(animal, animalName)

    this.getAffirmation = this.getAffirmation.bind(this);
  }

  getAffirmation() {
    const animal = this.state.animal;
    const animalName = this.state.animalName;
    const affirmations = [
      `${animalName} is a great name for a ${animal}!`,
      `Awwwwwww, ${animalName} is a super cute name!`,
      `I like the sound of that. ${animalName}! Here ${animalName}!`,
      `${animalName} is the best name for a ${animal}!`,
      `I was thinking ${animalName} too!`,
      `Ok, this is super weird but that ${animal}'s name is actually ${animalName} in real life!`,
      `All ${animal}s should be named ${animalName}`,
      `That is such a ${animalName}`,
      `Yup, no doubt it's ${animalName}. Good one!`,
      `Wow, legendary! I'm calling my ${animal} ${animalName} from now on`,
      `${animalName}? I love it!`,
      `That's a good pupper, ${animalName}!`,
      `It would be silly if ${animalName} wasn't its name`,
      `${animalName} is totally right, how did you know?`,
      `Such a ${animalName}, right?`,
    ];
    const randomMessage = affirmations[getRandomNum(affirmations.length)]
    return randomMessage;
  }

  render() {
    return (
      <div>
        <h1>{this.getAffirmation()}</h1>
        <button
          className="btn"
          onClick={this.props.nameAgain}
          onClick={this.props.reset}
        >
          New animal, who dis!
        </button>
      </div>
    );
  }
}

export default Results;
