import React, { Component } from 'react';

class NameForm extends Component {
  constructor(props) {
    super();
    
    this.state = {
      animal: props.animal,
      photos: [],
      page_count: 0,
      page: 1,
      per_page: 40,
      current_animal: {},
    }

    this.apiCall = this.apiCall.bind(this);
    this.submitName = this.submitName.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  submitName(e) {
    e.preventDefault();
    console.log("Submit");
  }

  apiCall(page, animal) {
    console.log('API call');
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
    console.log('Getting photo');
    return new Promise((resolve, reject) => {
      const res = this.apiCall(this.state.page, this.state.animal);
      console.log("res",res)
      if (res) {
        resolve(res);      
      } else {
        reject(Error("Error"));
      }
    })
    .then(res => {
      const index = this.getRandomNum(this.state.photos.length);
      console.log(index, this.state.photos[index]);
      this.setState({ current_animal: this.state.photos[index] });
    })
    .catch(err => {
      console.error(err);      
    });
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
      console.log(res)
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
      <form className="inputs" onSubmit={this.submitName}>
        <input id="nameInput" type="text" />
        <input type="submit" value="Name it!"/>
      </form>
    );
  }
}

export default NameForm;
