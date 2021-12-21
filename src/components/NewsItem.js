import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
    console.log("Constructor of NewsItem called");
  }
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="/" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" className="btn btn-primary ">
              Read
            </a>
          </div>
        </div>
      </>
    );
    // props cannot be changed  but state can be changed
  }
}

export default NewsItem;