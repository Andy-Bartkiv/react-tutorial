import React, { useState } from 'react';
import calculateWinner from '../modules/calcWinner';
import Board from './Board';

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

export default Game;