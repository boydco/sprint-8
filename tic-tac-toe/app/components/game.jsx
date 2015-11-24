// in /app/components/game.jsx
import React, { Component } from 'react'
import superagent from 'superagent'

import Square from './square.jsx!'

export default class Game extends Component {
  constructor (props) {
    super(props)

    this.state = {
      board: new Array(9).fill(''),
      history: []
    }
  }

  componentWillMount () {
    superagent
    .post('http://localhost:3000/games')
    .type('application/json')
    .accept('application/json')
    .send({history: []})
    .end((err, res) => {
      if (err) {
        console.log('Oh, noes!', err)
      } else {
        this.setState(res.body) // Put the POST response into this.state
      }
    })
  }

// Check for Win 
// 1. Win can only happen after 5th move
// 2. If history = win pattern after 5th move with length 3 while indx % 2 === 0 then x wins, else o wins
// 3. 

 const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]


doesXWin () {
  return this.state.history.reduce ((memo, winPatterns, idx) => {
    if idx >= 5 {
      memo{}
    }memo[winPatterns] = ()
  })
}

doesOWin () {
  return this.state.history.reduce ((memo, winPatterns, idx) => {
    memo[winPatterns] = ( )
  })
}
  isAWin () {

  }

 // Not sure how to proceed. 

  getBoard () {
    return this.state.history.reduce((memo, square, idx) => {
      memo[square] = (idx % 2 === 0) ? 'x' : 'o'
      return memo
    }, new Array(9).fill(''))
  }

  makeMove (square) {
    let id = this.state.id

    if (id) {
      superagent
      .patch(`http://localhost:3000/games/${id}`)
      .type('application/json')
      .accept('application/json')
      .send({ history: this.state.history.concat(square) })
      .end((err, res) => {
        if (err) {
          console.log('Oh, noes!', err)
        } else {
          this.setState(res.body)
        }
      })
    }
  }

  render () {
    console.log(this.state.history)

    let board = this.getBoard().map((mark, idx) => {
      return <Square key={idx} index={idx}
        clickCb={this.makeMove.bind(this)}>{mark}</Square>
    })

    return <div className='board'>{board}</div>
  }
}

