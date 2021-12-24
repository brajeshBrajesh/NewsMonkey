import React, { Component } from "react";

export class NewsItem extends Component {
  constructor() {
    super();
    console.log("Constructor of NewsItem called");
  }
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      this.props;
    return (
      <>
        <div className="card my-3">
          <img src={imageUrl} className="card-img-top" alt="/" />

          <div className="card-body">
            <span className=" badge rounded-pill bg-success">{source}</span>
            <h5 className="card-title">{title}...</h5>

            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary "
            >
              Read
            </a>
          </div>
          <p class="card-text">
            <small class="text-muted">
              By {author} at {new Date(publishedAt).toUTCString()}
            </small>
          </p>
        </div>
      </>
    );
    // props cannot be changed  but state can be changed
  }
}

export default NewsItem;
