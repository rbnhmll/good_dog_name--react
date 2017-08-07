import React, { Component } from 'react';
import './App.css';

import Switcher from './components/switcher'
import NameForm from './components/name_form'

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
    }
    
    this.submitName = this.submitName.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.setPhoto = this.setPhoto.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    this.handleState = this.handleState.bind(this);
  }
  
  submitName(e) {
    e.preventDefault();
    console.log("Submit form");
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

  getRandomNum(limit) {
    return Math.floor(Math.random() * limit) + 1;
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
      const index = this.getRandomNum(this.state.photos.length);
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
    const image = {backgroundImage: `url(${this.state.current_animal.src.large})`, height: "500px"};
    this.setState({ backgroundImage: image });
  }

  handleState(res) {
    res = res.json() // Convert promise to json obj.
    .then(res => {
      const { total_results, photos } = res;
      const page_count = Math.ceil(total_results / this.state.per_page);
      const random_page = this.getRandomNum(page_count);
      this.setState({
        page: random_page,
        page_count,
        photos,
      });

    })
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
          <Switcher />
          <NameForm
            submitName={this.submitName}
          />
        </div>
      </div>
    );
  }
}

export default App;
