import Square from "./Square";
import styles from '../styles/Board.module.css'

// BOARD component
function Board(props) {

    function renderRow(row) {
      return (
        <div 
          className = { `${styles.board_row}` } 
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

export default Board;