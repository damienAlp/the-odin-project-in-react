import { useState } from 'react'

import './App.css'

// SQUARE COMPONENT
function Square({ value, onSquareClick }) {
  return (
    <div className="square" onClick={onSquareClick}>
      {value}
    </div>
  )
}

function App() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])

  // PUT X OR O ON THE SQUARE
  const handleClick = (index) => {
    if (squares[index] || findWinner()) {
      return
    }

    const newSetOfSquares = squares.slice()

    xIsNext ? (newSetOfSquares[index] = 'X') : (newSetOfSquares[index] = 'O')

    setSquares(newSetOfSquares)
    setXIsNext((prevXBool) => !prevXBool)
  }

  // FIND THE WINNER
  const findWinner = () => {
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
      const [x, y, z] = lines[i]

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x]
      }
    }
    return null
  }

  const declareWinner = findWinner()
  let status
  if (declareWinner) {
    status = `The winnner is ${declareWinner}`
  } else {
    status = `It's ${xIsNext ? 'X' : 'O'}'s turn`
  }

  return (
    <>
      <div> {status} </div>
      <div className="board">
        <div className="square-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="square-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div className="square-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  )
}

export default App
