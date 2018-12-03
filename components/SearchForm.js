import React, { Component } from "react";

export default class SearchForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {};
  } 
  formSubmitted = event => {
    // Validate input value
    if (event.target.newsSource.value != "") {
      
      this.props.setNewsSource(event.target.newsSource.value);
    }
    
    event.preventDefault();
  }; 

  
  render() {
    return (
      <div>
        <div id="search">
          <h3>Search for News :</h3>
          <form onSubmit={this.formSubmitted}>
            <input
              name="newsSource"
              placeholder="enter news story to search"
              type="text"
            />
            <button>Search now</button>
          </form>
        </div>
      </div>
    );
  }
} 
