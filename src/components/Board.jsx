import { useState, useRef } from 'react'

import { createGrid } from '../utils/createGrid'
import { revealByFlags } from '../utils/revealByFlags'
import { revealCells } from '../utils/revealCells'
import Cell from './Cell'

export default function Board({
	board,
	setBoard,
	mineLocation,
	nonMinecount,
	setNonMinecount,
	gridConfig,
	setMineLocation,
	counter,
	setCounter,
	lost,
	setLost,
	setPopup,
	won,
	setWon,
}) {
	const { rows, columns, mines } = gridConfig

	const [mouseDown, setMouseDown] = useState(false)
	const [cellMouseDown, setCellMouseDown] = useState(false)
	const [contextMouseDown, setContextMouseDown] = useState(false)
	const timer = useRef()

	const doubleClickHandler = (e, cell) => {
		clearTimeout(timer.current)
		if (e.detail === 1) {
			timer.current = setTimeout(revealCell(cell), 200)
		} else if (e.detail === 2) {
			revealAdjacent(cell)
		}
	}

	const revealAdjacent = cell => {
		let newBoard = board
		let { x, y } = cell
		if (newBoard[x][y].revealed && newBoard[x][y].value && !won && !lost) {
			let revealedBoard = revealByFlags(board, x, y, mineLocation, nonMinecount)
			setBoard([...revealedBoard.board])
			setNonMinecount(revealedBoard.newNonMines)
		}
	}

	const revealCell = cell => {
		let newBoard = board
		let { x, y, flagged } = cell

		if (newBoard[x][y].value === 'X' && !flagged && !won && !lost) {
			newBoard[x][y].struck = true
			for (let i = 0; i < mineLocation.length; i++) {
				newBoard[mineLocation[i][0]][mineLocation[i][1]].revealed = true
			}
			setBoard([...newBoard])
		}
		if (flagged) {
			console.log('flagged')
		} else if (newBoard[x][y].value !== 'X' && !flagged && !won && !lost) {
			let revealedBoard = revealCells(newBoard, x, y, nonMinecount)
			setBoard(revealedBoard.board)
			setNonMinecount(revealedBoard.newNonMines)
		}
		// console.log(timer)
	}

	const resetBoard = () => {
		const newGrid = createGrid(rows, columns, mines)
		setBoard(newGrid.board)
		setMineLocation(newGrid.mineLocation)
		setNonMinecount(rows * columns - mines)
		setCounter(mines)
		setLost(false)
		setWon(false)
	}

	const updateFlag = cell => {
		if (!won && !lost) {
			let newBoard = board
			let { x, y, flagged, revealed } = cell
			if (!revealed) {
				newBoard[x][y].flagged = !newBoard[x][y].flagged
				flagged ? setCounter(counter + 1) : setCounter(counter - 1)
			}
			setBoard([...newBoard])
		}
	}

	const handleClick = e => {
		if (e.type === 'mousedown' && e.nativeEvent.which !== 3) {
			setMouseDown(true)
		} else {
			setMouseDown(false)
		}
	}

	const handleCellClick = (e, cell) => {
		const { revealed, flagged } = cell
		if (
			e.type === 'mousedown' &&
			e.nativeEvent.which !== 3 &&
			!revealed &&
			!flagged &&
			!won &&
			!lost
		) {
			setCellMouseDown(true)
		} else if (
			e.type === 'mousedown' &&
			e.nativeEvent.which === 3 &&
			!revealed &&
			!won &&
			!lost
		) {
			setContextMouseDown(true)
		} else {
			setMouseDown(false)
			setCellMouseDown(false)
			setContextMouseDown(false)
		}
	}

	return (
		<div className='grid h-screen items-center justify-items-center'>
			<div
				className='max-w-screen h-fit max-h-screen overflow-y-scroll border-[0.5px] border-submarine-500 px-5 py-0'
				onContextMenu={e => e.preventDefault()}
			>
				<div className='border-sub sticky top-0 grid border-y-[1.25rem] border-submarine-900 bg-submarine-900'>
					<button
						className={`mx-[1.5px] inline-block h-20 border-[0.5px] border-submarine-600 px-10 text-3xl uppercase transition-all duration-300 hover:border-submarine-500 hover:bg-submarine-700 ${
							won || lost ? 'bg-submarine-600/50' : 'bg-submarine-600/20'
						}`}
						onClick={resetBoard}
						onMouseDown={handleClick}
						onMouseUp={handleClick}
					>
						{(mouseDown && !won && '🥴') ||
							(cellMouseDown && !contextMouseDown && '🙏') ||
							(!cellMouseDown && contextMouseDown && '🧐') ||
							(won && columns === 30 && '🤩') ||
							(won && '🤩') ||
							(lost && '😵‍💫') ||
							'😃'}
					</button>
				</div>
				<div className='flex flex-row justify-center overflow-auto md:flex-col'>
					{board.map((row, i) => {
						return (
							<div className='flex w-fit flex-col md:flex-row' key={i}>
								{row.map((column, i) => {
									return (
										<Cell
											key={i}
											details={column}
											updateFlag={updateFlag}
											handleClick={handleCellClick}
											doubleClickHandler={doubleClickHandler}
											won={won}
											lost={lost}
											columns={columns}
										/>
									)
								})}
							</div>
						)
					})}
				</div>
				<div className='flex justify-between border-y-[1.25rem] border-submarine-900 bg-submarine-900 px-[1.5px] text-submarine-600'>
					<div className='flex h-16 w-20 select-none items-center justify-center border-[0.5px] border-submarine-600'>
						{counter}
					</div>
					<div className='text-xs'>
						<button
							className='m-[1.5] inline-block h-16 border-[0.5px]
               border-submarine-600 bg-submarine-600/20 px-10 font-semibold uppercase text-submarine-400 transition-all duration-300 hover:border-submarine-500 hover:bg-submarine-700 hover:text-teal-200 '
							onClick={() => setPopup(true)}
						>
							Difficulty
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
