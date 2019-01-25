import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount from './guess-count';
import GuessList from './guess-list';
import InfoModal from './info-modal';


const feedback = [
  'Make your guess',
  'Warm',
  'Warmer',
  'Hot',
  'Cool',
  'Cold',
  'You Got It!'
]

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guesses: [],
      currentGuess: 0,
      answer: Math.floor(Math.random() * 101) + 1,
      showWhat: false
    }
  }

  //show hot or cold based on guess
  setFeedback() {
    let guess = this.state.currentGuess;
    let answer = this.state.answer
    console.log(answer)
    let spread = Math.abs(guess - answer)
    console.log(spread)
    if (guess === 0) {
      return feedback[0]
    } else if (spread === 0) {
      return feedback[6]
    } else if (spread < 10) {
      return feedback[3]
    } else if (spread < 25) {
      return feedback[2]
    } else if (spread < 50) {
      return feedback[1]
    } else if (spread > 75) {
      return feedback[5]
    } else {
      return feedback[4]
    }
  }

  //change feedback, update currentGuess, add currentGuess to guesses array
  handleSubmit(event) {
    event.preventDefault();
    const guess = event.target.elements['userGuess'].value;
    event.target.reset()
    this.setState({ currentGuess: guess })
    this.setState(this.state.guesses.push(guess))
  }

  // show or hide info-modal
  setShowWhat() {
    this.setState({showWhat: !this.state.showWhat})
  }

  // reload page
  newGame() {
    window.location.reload()
  }

  render() {
    if (this.state.showWhat) {
      return (
        <div>
          <InfoModal hideMe={e => this.setShowWhat(e)} />
        </div>
      )
    } else {
      return (
        <div>
          <Header showModal={e => this.setShowWhat(e)} newGame={e => this.newGame(e)} />
          <GuessSection feedback={this.setFeedback()} handleSubmit={event => this.handleSubmit(event)} />
          <GuessCount count={this.state.guesses.length} />
          <GuessList guesses={this.state.guesses} />
        </div>
      );
    }
  }
}