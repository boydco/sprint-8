// in /app/components/game.jsx
import React, { Component } from 'react'

import Square from './square.jsx!'



export default class Game extends Component {
   constructor (props) {
  super(props) // pass the props on up to the superclass

  this.state = {
    board: new Array(9).fill('x')
  }
}

  makeMove (square) {
    let board = this.state.board.map((mark, idx) => {
      return (idx === square) ? 'x' : mark
    })

    this.setState({ board: board })
  }

  render () {
    let board = this.state.board.map((mark, idx) => {
      return <Square key={idx} index={idx}
      clickCb={this.makeMove.bind(this)}>{mark}</Square>
    })

    return <div className='board'>{board}</div>
  }
}

