import React, { Component } from 'react';
import './App.css';

import { getRandomNum } from './components/helpers';
import Switcher from './components/switcher';
import NameForm from './components/name_form';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      animal: props.match.params.animal,
      photos: [],
      page_count: 0,
      page: 1,
      per_page: 40,
      current_animal: {},
      backgroundImage: {},
      animalName: "",
    }
    
    this.nameAgain = this.nameAgain.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.setPhoto = this.setPhoto.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  nameAgain() {
    this.apiCall(this.state.page, this.state.animal)
    .then(res => {
      this.handleState(res);
    })
    .then(() => {
      this.getPhoto();
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  apiCall(page, animal) {
    const auth = '563492ad6f9170000100000154fe350907d54d0d5dd47f57f2289d8b';
    const url = `http://api.pexels.com/v1/search?query=${animal}&per_page=${this.state.per_page}&page=${page}`;
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", auth);
    
    return fetch(url, {
      headers: reqHeaders,
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.error(err);
    })
  }
  
  getPhoto() {
    return new Promise((resolve, reject) => {
      const res = this.apiCall(this.state.page, this.state.animal);
      if (res) {
        resolve(res);      
      } else {
        reject(Error("Error getting images"));
      }
    })
    .then(res => {
      const index = getRandomNum(this.state.photos.length);
      this.setState({ current_animal: this.state.photos[index] });
    })
    .then(() => {
      this.setPhoto();
    })
    .catch(err => {
      console.error(err);      
    });
  }

  setPhoto() {
    if (this.state.current_animal.src) {
      const image = {backgroundImage: `url(${this.state.current_animal.src.large})`};
      this.setState({ backgroundImage: image });
    } else {
      this.getPhoto();
    }
  }

  handleState(res) {
    res = res.json() // Convert promise to json obj.
    .then(res => {
      const { total_results, photos } = res;
      const page_count = Math.ceil(total_results / this.state.per_page);
      const random_page = getRandomNum(page_count);
      this.setState({
        page: random_page,
        page_count,
        photos,
      });

    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillMount() {
    this.apiCall(this.state.page, this.state.animal)
    .then(res => {
      this.handleState(res);
    })
    .then(() => {
      this.getPhoto();
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  render() {
    return (
      <div
        className="App"
        style={this.state.backgroundImage}
      >
        <div className="wrapper">
          <Switcher
            animal={this.state.animal}
          />
          <NameForm
            nameAgain={this.nameAgain}
            animal={this.state.animal}
            setName={this.handleChange}
            animalObj={this.state.current_animal}
            animalName={this.state.animalName}
          />
        </div>
      </div>
    );
  }
}

export default App;
