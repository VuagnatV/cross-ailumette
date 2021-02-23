import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import allumette from './allumette.jpg'
import SearchBar from './components/SearchBar'
import { Component } from 'react'

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: [[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[1,1,1,1,1,1,1]],
      game: 1
    }
  }

  changeBoard(values) {
    if(this.state.game == 1){
      const boardTmp = this.state.board
      if(this.ErrorLine(values[0], boardTmp)){
        if(this.ErrorMatches(values[0], values[1], boardTmp)){
          const ligne = values[0] - 1
          let help = boardTmp[ligne].indexOf(1) + parseInt(values[1])
          for(let j = boardTmp[ligne].indexOf(1); j < help; j++){
            boardTmp[ligne][j] = 0
          }
          this.setState({board: boardTmp})
          if(this.GameOver(boardTmp)){
            this.state.game = 0
            alert("You lost, too bad..")
          }
          if(this.state.game == 1){
            this.iaTurn()
          }
        }     
      }
    }
    else alert("the game is over")
  }
  
  GameOver(board){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 7; j++){
            if(board[i][j]) return false
        }
    }
    return true
  }

  iaTurn() {
    let line = this.getRandomInt(0, 4)
    const boardTmp = this.state.board
    while(!boardTmp[line].includes(1)){
      line = this.getRandomInt(0, 4)
    }
    const NbrMatches = boardTmp[line].lastIndexOf(1) - boardTmp[line].indexOf(1) + 1
    const matches = this.getRandomInt(1, NbrMatches + 1)
    let help = boardTmp[line].indexOf(1) + matches
    for(let j = boardTmp[line].indexOf(1); j < help; j++){
      boardTmp[line][j] = 0
    }
    this.setState({board: boardTmp})
    if(this.GameOver(boardTmp)){
      this.state.game = 0
      alert(" I lost.. snif.. but I’ll get you next time!!")
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  ErrorLine(line, gameboard){
      if(line > 4 || line == 0){
          console.log("Error: this line is out of range")
          alert("Error: this line is out of range")
          return false
      }
      else if(line < 0 || isNaN(line)){
          console.log("Error: invalid input (positive number expected)")
          alert("Error: invalid input (positive number expected)")
          return false
      }
      return true
  }

  ErrorMatches(line, matches, gameboard){
    if(matches == 0){
        console.log("Error: you have to remove at least one match")
        alert("Error: you have to remove at least one match")
        return false
    }
    else if(matches < 0 || isNaN(matches)){
        console.log("Error: invalid input (positive number expected)")
        alert("Error: invalid input (positive number expected)")
        return false
    }
    else if((gameboard[line - 1].lastIndexOf(1) - gameboard[line - 1].indexOf(1) + 1) < matches){
        console.log("Error: not enough matches on this line")
        alert("Error: not enough matches on this line")
        return false
    }
    return true
  }

  render(){
    const board = this.state.board
  
    return (
      <div>
        <table className="table">
          <tbody className="tbody"> 
            {board.map((row, i) => {
              return (
                <tr key={i} className="row">
                  {i + 1}
                  {row.map((element, j) => {
                    if(element == 1){
                      return (
                        <td key={j} className="cell"> 
                          <img className="img"  src={allumette}/>                  
                        </td>
                      )
                    }
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        
        <SearchBar onSubmit={(value) => this.changeBoard(value)} />
        
      </div>
      
    )
}}

export default App;
