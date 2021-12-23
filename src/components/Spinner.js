import Loading from "./Loading.gif";
import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <>
        <div className="container text-center">
          <img
            src={Loading}
            alt="Spinner"
            style={{ height: "40px", width: "40px" }}
          />
        </div>
      </>
    );
  }
}
