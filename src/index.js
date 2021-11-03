import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const log = console.log;


function Square(props) {
  return (
    <button
      className='square'
      onClick={ props.onClick }
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderRow(row) {
    return (
      <div className="board-row" key={`row-${row}`}>
        { [0,1,2].map((sq) => this.renderSquare(row*3 + sq)) }
    </div>
    )
  }
  renderSquare(i) {
    return (
      <Square
        key = {i} 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        { [0,1,2].map((row) => this.renderRow(row)) }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepN: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepN + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i])
      return;
    squares[i] = (this.state.xIsNext) ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepN: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepN: step,
      xIsNext: (step % 2) === 0,
    })
  }

  displayLocation(move) {
    let res;
    if (!move)
      res = 'Go to game start';
    else {
      const location = this.state.history[move].squares.reduce((tot, val, ind) => {
        let res = (val) ? tot + val : tot + '_';
        res += ((ind+1) % 3 === 0 && ind < 8) ? ',' : ''; 
        return res;
      }, '');
      res = `Go to move #${move} ` + location;
    }
    return res;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepN];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const description = this.displayLocation(move);
      return (
        <li 
          key={move}
        >
          <button
            className={(move === this.state.stepN) ? 'bold' : ''}
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {description}
          </button>
        </li>
      )
    })

    let status = (winner)
                ? `Winner ${winner}`
                : `Next player: ${(this.state.xIsNext) ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} 
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};