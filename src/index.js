import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const log = console.log;

// SQUARE component
function Square(props) {
  // if we need to mark winning squares
  let win = (props.winner && props.winner.includes(props.id)) 
    ? 'win' 
    : '';
  return (
    <button
      className = { `square ${win}` }
      onClick = { props.onClick }
    >
      { props.value }
    </button>
  )
};

// BOARD component
function Board(props) {
  function renderRow(row) {
    return (
      <div 
        className = "board-row" 
        key = { `row-${row}` }
      >
        { [0,1,2].map((sq) => renderSquare(row*3 + sq)) }
      </div>
    )
  };
  function renderSquare(i) {
    return (
      <Square
        key = { i }
        id = { i }
        winner = { props.winner }
        value = { props.squares[i] }
        onClick = { () => props.onClick(i) }
      />
    )
  };
  
  return (
    <div>
      { [0,1,2].map((row) => renderRow(row)) }
    </div>
  );  
}

// GAME component

function Game() {
  const [history, setHistory] = useState([{
    index: 0,
    squares: Array(9).fill(null)
  }]);
  const [stepN, setStepN] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [sortDesc, setSortDesc] = useState(true);

  function handleClick(i) {
    const historyOld = history.slice(0, stepN + 1);
    const current = historyOld[historyOld.length - 1];
    const squares = current.squares.slice();
    const index = current.index; 
    const winner = calculateWinner(squares);

    if (winner || squares[i])
      return;
    squares[i] = (xIsNext) ? 'X' : 'O';
    setHistory([...historyOld, {
      squares: squares,
      index: index + 1,
    }]);
    setStepN(historyOld.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    log(step, stepN)
    setStepN(step);
    setXIsNext((step % 2) === 0);
  }

  function sortHistory() {
    setSortDesc(!sortDesc);
  }

  function displayBoardShot(move) {
    return history[move].squares
      .reduce((tot, val, ind) => {
        let res = (val) ? tot + val : tot + ' ';
        res += ((ind+1) % 3 === 0 && ind < 8) ? '\n' : ''; 
        return res;
      }, '');
  }

  let historyOld = [...history];
  const current = historyOld[stepN];
  const winner = calculateWinner(current.squares);
  if (!sortDesc) 
    historyOld.sort((a,b) => (a.index - b.index) ? -1 : 1);
  let status = (winner)
    ? `Winner ${winner.mark}`
    : (current.index >= 9) 
      ? `It's a draw`
      : `Next player: ${(xIsNext) ? 'X' : 'O'}`;

  const moves = historyOld.map((step, move) => {
    return (
      <div 
        className = 'step'
        key = { move }
      >
        <button
          className = { (step.index === stepN) ? 'bold' : '' }
          onClick = { () => jumpTo(step.index) }
        >
          { (!step.index) ? `${move}. Go to game start` : `${move}.  Go to move #${step.index}` }
        </button>
        <div className='shot-board'>
          { displayBoardShot(step.index) }
        </div>
      </div>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          winner = { (winner) ? winner.pos : null}
          squares = { current.squares }
          onClick = { (i) => handleClick(i) } 
        />
      </div>
      <div className="game-info">
        <div>OXO-Game v.12.7.3</div>
        <div className="status">
          {status}
        </div>
        <div>Sort:&nbsp;
          <button onClick = { () => sortHistory() }>
            { (!sortDesc) ? String.fromCharCode(8679) : String.fromCharCode(8681)}
          </button>
        </div>
        <div>{ moves }</div>
      </div>
    </div>
  );
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  let res = null;
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
      if (!res) {
        res = {mark: squares[a], pos: lines[i]};
      } else {
        res.pos.push(...lines[i]);
      }
    }
  }
  return res;
};