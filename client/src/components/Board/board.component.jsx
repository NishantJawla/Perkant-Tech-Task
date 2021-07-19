import React, { Component } from "react";
const axios = require("axios");
 class Board extends Component {
     constructor(){
         super();
         this.state = {
             score: undefined,
         }
     }
    async getDataFromServer () {
        try {
            const response = await axios
            .get("https://api.sheety.co/fd5fce836320895b1f8e4b4a4a7e4ddc/test/sheet1");
            this.setState({
                score: response.data.sheet1
            })
        } catch (e) {
            console.log(e)
        }
    }
  componentDidMount() {
    this.getDataFromServer();
  }
  renderData = () => {
      let data = this.state.score
      if(this.state.score){
          data = data.sort((a, b) => {
            if(a.score > b.score){
                    return -1;
            }else if(a.score < b.score){
                    return 1;
            }else{
                    return 0;
            }
        })
      }
      return this.state.score ?  data.map((score,index) => {
          return (
        <React.Fragment key = {index}>
        <div key={score.id} className="flex justify-between">
        <span>{index+1}</span>
        <span>{score.name}</span>
        <span>{score.score}</span>
        <span>{score.code}</span>
        </div>
        </React.Fragment>)
      }) : ''
  }
  render() {
        return (
            <div className="w-3/4 mx-auto">
                <div className="flex justify-between">
                    <span>Rank</span>
                    <span>Name</span>
                    <span>Score</span>
                    <span>Code</span>
                </div>
                {this.renderData()}
            </div>
        )
    
    
  }
}
export default Board;