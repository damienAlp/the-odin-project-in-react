import { useState } from 'react'

// CHILD COMPONENT
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

// MAIN FUNCTION AND PARENT COMPONENT
export default function Board() {
  // STATE TO TRACK PLAYER TURN
  const [xIsNext, setXIsNext] = useState(true)

  // SQUARES ARRAY
  const [squares, setSquares] = useState(Array(9).fill(null))

  // PUT X OR O IN THE SQUARES
  // THIS FUNCTION TAKES AN ARGUMENT WHICH IS i. i IS PASSED AS AN ARGUMENT DOWN IN THE JSX.
  function handleClick(i) {
    // RETURN EARLY (STOP FUNCTIONING) EITHER IF ONE OF THE CONDITIONS ARE MET
    if (calculateWinner(squares) || squares[i]) {
      return
    }

    // RETURN A COPY OF THE ARRAY, SO THAT THE STATE DOESN'T GET MODIFIED DIRECTLY
    const nextSquares = squares.slice()

    // CHANGE TURN BETWEEN X AND O
    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O')

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  // YOU GET X OR O FROM calculateWinner(squares), REMEMBER IT RETURNS squares[a] AND sqaures[a] IS EITHER X OR O OR null
  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

// FIND THE WINNER
function calculateWinner(squares) {
  // WINNING LINES
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    // GET LINES AS A,B,C FOR EXAMPLE; lines[i] IS [0, 1, 2] TAKE THIS AS [a:0, b:1, c:2]
    const [a, b, c] = lines[i]

    // FIRST CHECK IF square[a] IS TRUTHY. IF THAT'S THE CASE, CHECK IF square[a] AND square[b] HAVE THE SAME VALUE (BOTH ARE X OR BOTH ARE O)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // FINALLY CHECK IF square[a] AND square[c] HAVE THE SAME VALUE. IF ALL CONDITIONS ARE MET RETURN squares[a] (X OR O)
      return squares[a]
    }
  }
  // IF THE CONDITION IS NOT MET, JS READS TILL return null, SO THE VALUE WILL BE NULL, FALSY
  return null
}
