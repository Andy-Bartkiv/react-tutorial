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
        index: 0,
        squares: Array(9).fill(null)
      }],
      stepN: 0,
      xIsNext: true,
      sortDesc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepN + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const index = current.index;
    // log('hC', index, squares);
    if (calculateWinner(squares) || squares[i])
      return;
    squares[i] = (this.state.xIsNext) ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        index: index + 1,
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

  sortHistory() {
    this.setState({
      sortDesc: !this.state.sortDesc,
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
    let history = [...this.state.history];
    const current = history[this.state.stepN];
    const winner = calculateWinner(current.squares);
    // history = (this.state.sortDesc) ? history : history.reverse();
    if (!this.state.sortDesc) 
      history.sort((a,b) => (a.index - b.index) ? -1 : 1);
    const moves = history.map((step, move) => {
      return (
        <li 
          key={move}
        >
          <button
            className={(step.index === this.state.stepN) ? 'bold' : ''}
            onClick={() => {
              this.jumpTo(step.index);
            }}
          >
            {this.displayLocation(step.index)}
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
          <button
            onClick = { () => this.sortHistory() }
          >
            {(this.state.sortDesc) ? 'Sort -Up-' : 'Sort Down'}
          </button>
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