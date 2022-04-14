import { useState, useEffect } from 'react'

import { createGrid } from './utils/createGrid'
import Board from './components/Board'
import DifficultyPopup from './components/DifficultyPopup'

export default function App() {
	const [gridConfig, setGridConfig] = useState({
		rows: 9,
		columns: 9,
		mines: 10,
	})

	const { rows, columns, mines } = gridConfig
	const newGrid = createGrid(rows, columns, mines)
	const [board, setBoard] = useState(newGrid.board)
	const [mineLocation, setMineLocation] = useState(newGrid.mineLocation)
	const [nonMinecount, setNonMinecount] = useState(rows * columns - mines)
	const [counter, setCounter] = useState(mines)
	const [lost, setLost] = useState(false)
	const [won, setWon] = useState(false)
	const [popup, setPopup] = useState(true)

	useEffect(() => {
		if (nonMinecount === 0) {
			setWon(true)
		} else {
			for (let i = 0; i < mineLocation.length; i++) {
				if (board[mineLocation[i][0]][mineLocation[i][1]].revealed) {
					setLost(true)
				}
			}
		}
	}, [nonMinecount, board, mineLocation])

	const appHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty('— app-height', `${window.innerHeight}px`)
	}
	window.addEventListener('resize', appHeight)
	appHeight()

	return (
		<div className=''>
			{popup && (
				<DifficultyPopup
					gridConfig={gridConfig}
					setGridConfig={setGridConfig}
					setBoard={setBoard}
					setMineLocation={setMineLocation}
					setNonMinecount={setNonMinecount}
					setCounter={setCounter}
					setLost={setLost}
					setPopup={setPopup}
					setWon={setWon}
				/>
			)}
			<Board
				board={board}
				setBoard={setBoard}
				mineLocation={mineLocation}
				setMineLocation={setMineLocation}
				nonMinecount={nonMinecount}
				setNonMinecount={setNonMinecount}
				gridConfig={gridConfig}
				counter={counter}
				setCounter={setCounter}
				lost={lost}
				setLost={setLost}
				setPopup={setPopup}
				won={won}
				setWon={setWon}
			/>
		</div>
	)
}
