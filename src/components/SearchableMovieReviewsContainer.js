// Code SearchableMovieReviewsContainer Here

import React, { Component } from "react";
import "isomorphic-fetch";

import MovieReviews from "./MovieReviews.js";

const NYT_API_KEY = "f98593a095b44546bf4073744b540da0";
const BASE_URL =
  "https://api.nytimes.com/svc/movies/v2/reviews/search.json?" +
  `api-key=${NYT_API_KEY}&query=`;

class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super();

    this.state = { searchTerm: "", reviews: [] };
  }

  handleInputChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(event.target);

    fetch(BASE_URL.concat(this.state.searchTerm))
      .then(res => res.json())
      .then(json => this.setState({ reviews: json.results }))
      .then(() => console.log(this.state.reviews));
  };

  render() {
    return (
      <div className="searchable-movie-reviews">
        <h3>Search Movies </h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleInputChange} />
          <button type="submit"> search </button>
        </form>
        {this.state.reviews.length > 0 && <h4>Results:</h4>}
        <MovieReviews reviews={this.state.reviews} />
      </div>
    );
  }
}

export default SearchableMovieReviewsContainer;
