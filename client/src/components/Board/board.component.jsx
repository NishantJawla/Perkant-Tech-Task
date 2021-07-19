import React, { Component } from "react";
import {isAuthenticated} from "../../pages/homepage/homepage.api-calls";
import  { Redirect } from 'react-router-dom'
const axios = require("axios");

class Board extends Component {
  constructor() {
    super();
    this.state = {
      score: undefined,
    };
  }
  async getDataFromServer() {
    try {
      // console.log("Loaded Data")
      const response = await axios.get(
        "https://sheet.best/api/sheets/b5b59e89-b982-4ab4-8a28-519ab950a817"
      );
      // console.log(response)
      this.setState({
        score: response.data,
      });
    } catch (e) {
      // console.log(e);
    }
  }
  componentDidMount() {
    this.getDataFromServer();
  }
  renderData = () => {
    let data = this.state.score;
    if (this.state.score) {
      data = data.sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        } else if (a.score < b.score) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return this.state.score
      ? data.map((score, index) => {
          return (
            <React.Fragment key={index}>
              <div
                key={score.id}
                className="bg-gray-200 border-2 border-gray-400 border-b-0 flex justify-between"
              >
                <span className="w-1/4 mx-auto flex
            justify-center
            items-center">
                  {index + 1}
                </span>
                <span className="w-1/4 mx-auto flex
            justify-center
            items-center">
                  {score.name}
                </span>
                <span className="w-1/4 mx-auto flex
            justify-center
            items-center">
                  {score.score}
                </span>
                <span className="w-1/4 mx-auto flex
            justify-center
            items-center">
                  {score.code}
                </span>
              </div>
            </React.Fragment>
          );
        })
      : "";
  };
  render() {
    if(!isAuthenticated()){
      console.log("is not authenyciated")
      return <Redirect to="/"></Redirect>
    }
    return (
      <div className="w-3/4 mx-auto my-auto">
        <div className="border-4 border-b-0 flex justify-between">
          <span
            className="w-1/4 mx-auto flex
            justify-center
            items-center
            font-extrabold"
          >
            Rank
          </span>
          <span
            className="w-1/4 mx-auto flex
            justify-center
            items-center
            font-extrabold"
          >
            Name
          </span>
          <span
            className="w-1/4 mx-auto flex
            justify-center
            items-center
            font-extrabold"
          >
            Score
          </span>
          <span
            className="w-1/4 mx-auto flex
            justify-center
            items-center
            font-extrabold"
          >
            Code
          </span>
        </div>
        {this.renderData()}
      </div>
    );
  }
}
export default Board;
