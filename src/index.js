import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Card(props) {
  return (
    <button className="card" style={props.style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(25).fill(null),
      colors: Array(25).fill('white'),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const cards = this.state.cards.slice();
    const colors = this.state.colors.slice();
    if (calculateWinner(cards)) {
      return;
    }
    cards[i] = this.state.xIsNext ? 'x' : 'o';
    colors[i] = this.state.xIsNext ? 'rgba(180,10,10,0.4)' : 'rgba(0,40,220,0.4)'
    this.setState({
      cards: cards,
      colors: colors,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderCard(i) {
    return (
      <Card
        value={this.state.cards[i]}
        style={{background: this.state.colors[i]}}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.cards);
    let status;
    if (winner) {
      status = 'WINNER: ' + winner;
    } else {
      status = 'Your turn, ' + (this.state.xIsNext ? 'red team!' : 'blue team!');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
        </div>
        <div className="board-row">
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
          {this.renderCard(9)}
        </div>
        <div className="board-row">
          {this.renderCard(10)}
          {this.renderCard(11)}
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
        </div>
        <div className="board-row">
          {this.renderCard(15)}
          {this.renderCard(16)}
          {this.renderCard(17)}
          {this.renderCard(18)}
          {this.renderCard(19)}
        </div>
        <div className="board-row">
          {this.renderCard(20)}
          {this.renderCard(21)}
          {this.renderCard(22)}
          {this.renderCard(23)}
          {this.renderCard(24)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(cards) {
  // const lines = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];
  // for (let i = 0; i < lines.length; i++) {
  //   const [a, b, c] = lines[i];
  //   if (cards[a] && cards[a] === cards[b] && cards[a] === cards[c]) {
  //     return cards[a];
  //   }
  // }
  return null;
}
