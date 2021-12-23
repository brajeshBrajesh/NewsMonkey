import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export class news extends Component {
  articles = [
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //   description:
    //     "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //   publishedAt: "2020-04-27T11:41:47Z",
    //   content:
    //     "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    // },
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //   description:
    //     "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //   publishedAt: "2020-03-30T15:26:05Z",
    //   content:
    //     "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    // },
  ];
  constructor() {
    super();
    console.log("Constructor of news section called");
    this.state = {
      articles: this.articles,
      loading: true,
    };
    console.log(this.articles);
  }

  async componentDidMount() {
    console.log("ComponentDidMount");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=50a60f7ef59e488f81c23e2a2574e94c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    let disablePrev = true;
    let disableNext = false;
    let NumPages = Math.ceil(parsedData.totalResults / this.props.pageSize);
    if (NumPages == 1) disableNext = true;
    this.setState({
      articles: parsedData.articles,
      page: 1,
      disableNext: disableNext,
      disablePrev: disablePrev,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("Prev click");
    let page = this.state.page - 1;
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=50a60f7ef59e488f81c23e2a2574e94c&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    let disablePrev = false;
    let disableNext = false;
    if (page == 1) disablePrev = true;
    this.setState({
      articles: parsedData.articles,
      page: page,
      disableNext: disableNext,
      disablePrev: disablePrev,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next click ");
    let page = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=50a60f7ef59e488f81c23e2a2574e94c&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    let disablePrev = false;
    let disableNext = false;
    let numPages = Math.ceil(parsedData.totalResults / this.props.pageSize);
    if (page >= numPages) disableNext = true;
    this.setState({
      articles: parsedData.articles,
      page: page,
      disableNext: disableNext,
      disablePrev: disablePrev,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 style={{ textAlign: "center" }} className="my-4">
            NewsMonkey Top Headlines
          </h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 130)
                          : ""
                      }
                      newsUrl={element.url}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="container my-2 d-flex justify-content-between">
          <button
            onClick={this.handlePrevClick}
            type="button"
            className="btn btn-dark"
            disabled={this.state.disablePrev}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={this.state.disableNext}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }
}

export default news;
