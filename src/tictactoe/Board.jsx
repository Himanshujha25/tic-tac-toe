import React, { useState } from 'react'

export default function Board() {

    const [cell, setCell] = useState(Array(9).fill(""))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState("")
    const [isDraw, setIsDraw] = useState(false)

    const handelClick = (index) => {
        if (cell[index] !== "" || winner) return

        const newCell = cell.slice()
        newCell[index] = currentPlayer
        setCell(newCell)

        if (checkWinner(newCell)) {
            setWinner(currentPlayer)
        } else if (newCell.every(c => c !== "")) {
            setIsDraw(true)
        } else {
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
        }
    }

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    const checkWinner = (newCells) => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination
            if (newCells[a] && newCells[a] === newCells[b] && newCells[a] === newCells[c]) {
                return true
            }
        }
        return false
    }

    const resetGame = () => {
        setCell(Array(9).fill(""))
        setWinner("")
        setCurrentPlayer("X")
        setIsDraw(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 p-4 flex flex-col items-center">
            <h1 className="text-center font-extrabold text-4xl md:text-5xl text-white mb-5">TIC-TAC-TOE</h1>

            <div className="text-white text-xl mb-4">
                {winner ? `Player ${winner} Wins! 🎉` : isDraw ? "It's a Draw! 🤝" : `Current Player: ${currentPlayer}`}
            </div>

            <div className="grid grid-cols-3 gap-4 w-72 h-72 md:w-96 md:h-96 bg-slate-700 p-4 rounded-xl shadow-2xl">

                {cell.map((value, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center border-4 border-purple-500 
                              rounded-lg cursor-pointer text-5xl md:text-6xl font-bold text-white 
                              bg-slate-800 hover:bg-purple-600 transition-all duration-300
                              aspect-square overflow-hidden leading-none"
                        onClick={() => handelClick(index)}
                    >
                        {value}
                    </div>

                ))}

            </div>

            <button
                onClick={resetGame}
                className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-800 text-white text-lg rounded-lg shadow-lg transition-all duration-300"
            >
                Restart Game
            </button>
            <footer className="mt-4 text-center text-white text-lg">
                Made with ❤️ by <span className="font-bold text-purple-400">Himanshu Jha</span>
            </footer>

        </div>

    )
}
