import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Length 25 array for words from database
// Length 25 array for colors, random (8,9,7,1)

const WORDS = [...Array(25).keys()];
const COLORS = ['blue', 'blue', 'blue', 'blue', 'blue',
                'red', 'red', 'red', 'red', 'red',
                'neutral', 'neutral', 'bomb', 'neutral', 'neutral',
                'blue', 'blue', 'blue', 'blue', 'red',
                'red', 'red', 'neutral', 'neutral', 'neutral'];
const blueCount = COLORS.filter(function(x) {return x === "blue"}).length;
const BLUEFIRST = blueCount >= 9;

function Card(props) {
    return (
      <button
        className={'card card-'+props.color}
        onClick={() => props.onClick()}
      >
        {props.word}
      </button>
    );
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: WORDS,
      colors: Array(25).fill(null),
      blueTurn: BLUEFIRST,
      playerTurn: false,
      picksLeft: 0,
      hint: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(i) {
    if (this.state.playerTurn) {
      let colors = this.state.colors.slice();
      colors[i] = COLORS[i];

      let blueTurn = this.state.blueTurn;
      let correctPick = (blueTurn && colors[i] === "blue") ||
                        (!blueTurn && colors[i] === "red");
      let picksLeft = this.state.picksLeft - 1;

      if (correctPick && picksLeft > 0) {
        this.setState({
          colors: colors,
          picksLeft: picksLeft
        })
      } else {
        this.setState({
          colors: colors,
          blueTurn: !blueTurn,
          playerTurn: false,
          picksLeft: 0,
          hint: null,
        })
      }
    }
  }

  handleChange(event) {
    this.setState({hint: event.target.value});
  }

  handleSubmit(event) {
    let response = this.state.hint.split(", ");

    if (/[^a-zA-Z-.]/.test(response[0]) ||
        !/\d+?/.test(response[1]) ||
        response[1] <= 0 ||
        response[1] > 25) {
      alert("bad");
    } else {
      this.setState({
        playerTurn: true,
        picksLeft: Number(response[1]),
        hint: response[0],
      });
    }

    event.preventDefault();
  }

  renderHintForm() {
    return (
      <form id="hint" onSubmit={this.handleSubmit}>
        <label>
          Hint, Count: {"\t"}
          <input
            type="text"
            value={this.state.hint}
            onChange={this.handleChange}
          />
        </label> {"\t"}
        <input type="submit" value="go" />
      </form>
    );
  }

  renderHint() {
    return (
      <div className="header">
        Hint: {this.state.hint} <br/>
        {this.state.picksLeft} picks remain.
      </div>
    );
  }

  renderCard(i) {
    return (
      <Card
        word={this.state.words[i]}
        color={this.state.colors[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderScores() {
    let colors = this.state.colors.slice();
    let blueScore = colors.filter(function(x) {return x === "blue"}).length;
    let redScore = colors.filter(function(x) {return x === "red"}).length;

    if (BLUEFIRST) {
      if (blueScore >= 9) {
        return <span style={{color: "#00f"}}>BLUE TEAM WINS!</span>;
      } else if (redScore >= 8) {
        return <span style={{color: "#f00"}}>RED TEAM WINS!</span>;
      }
    } else {
      if (blueScore >= 8) {
        return <span style={{color: "#00f"}}>BLUE TEAM WINS!</span>;
      } else if (redScore >= 9) {
        return <span style={{color: "#f00"}}>RED TEAM WINS!</span>;
      }
    }

    return (
      <div style={{display: "block"}}>
        Score: {"\t"}
        <span style={{color: "#00f"}}>{blueScore}</span>
        <span style={{color: "#000"}}> - </span>
        <span style={{color: "#f00"}}>{redScore}</span>
      </div>
    );
  }

  render() {
    const status = this.state.blueTurn ? "BLUE" : "RED";
    const statusColor = this.state.blueTurn ? "#00f" : "#f00";
    const player = this.state.playerTurn ? "team" : "codemaster";

    return (
      <div>
        <div className="header">
          <span style={{color: statusColor}}>{status}</span> {player}'s turn
        </div>

        {this.renderScores()}
        
        {this.state.playerTurn ? this.renderHint() : this.renderHintForm()}

        <div>
          {[0,1,2,3,4].map(i => this.renderCard(i))}
        </div>
        <div>
          {[5,6,7,8,9].map(i => this.renderCard(i))}
        </div>
        <div>
          {[10,11,12,13,14].map(i => this.renderCard(i))}
        </div>
        <div>
          {[15,16,17,18,19].map(i => this.renderCard(i))}
        </div>
        <div>
          {[20,21,22,23,24].map(i => this.renderCard(i))}
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
