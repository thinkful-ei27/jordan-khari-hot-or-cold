import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount from './guess-count';
import GuessList from './guess-list';


const feedback = [
  'Make your guess',
  'Hot',
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
    }
  }

  setFeedback() {
    let guess = this.state.currentGuess;
    let answer = this.state.answer
    console.log(answer)
    let spread = Math.abs(guess - answer)
    console.log(spread)
    if (guess === 0) {
      return feedback[0]
    } else if (spread === 0) {
      return feedback[3]
    } else if (spread > 50) {
      return feedback[2]
    } else {
      return feedback[1]
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({currentGuess: event.taget.value});
    console.log(this.state.currentGuess);
  }

  render() {
    return (
      <div>
        <Header />
        <GuessSection feedback={this.setFeedback()} value={this.state.currentGuess} onSubmit={event => this.handleSubmit(event)} onChange={event => this.handleChange(event)}/>
        <GuessCount count={this.state.guesses.length} />
        <GuessList guesses={this.state.guesses} />
      </div>
    );
  }
}