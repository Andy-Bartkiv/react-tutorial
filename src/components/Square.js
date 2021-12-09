import styles from '../styles/Square.module.css'

// SQUARE component
function Square(props) {
  let squareClass = styles.square;
  // if we need to mark winning squares
    if (props.winner && props.winner.includes(props.id)) 
      squareClass += ` ${styles.win}`; 
    return (
      <button
        className = { squareClass }
        onClick = { props.onClick }
      >
        { props.value }
      </button>
    )
  };

  export default Square;