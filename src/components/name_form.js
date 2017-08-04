import React, { Component } from 'react';

class NameForm extends Component {
  constructor() {
    super();
    
    this.state = {
      animal: "",
      page_count: 0,
    }

    this.apiCall = this.apiCall.bind(this);
    this.submitName = this.submitName.bind(this);
  }

  submitName(e) {
    e.preventDefault();
    this.apiCall();
  }

  apiCall() {
    const Authorization = '563492ad6f9170000100000154fe350907d54d0d5dd47f57f2289d8b';
    const url = 'http://api.pexels.com/v1/search?query=dogs&per_page=40&page=5';
    
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", Authorization);
    
    fetch(url, {
      // method: 'GET',
      headers: reqHeaders,
      // mode: 'cors',
    })
    .then(res => res.json()) // Convert promise to json obj.
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    })
  }

  componentWillMount() {
    this.apiCall();
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
