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

  export default Square;