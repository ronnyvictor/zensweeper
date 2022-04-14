import { useState } from 'react'
import { createGrid } from '../utils/createGrid'

export default function DifficultyPopup({
	gridConfig,
	setGridConfig,
	setBoard,
	setNonMinecount,
	setMineLocation,
	setCounter,
	setLost,
	setWon,
	setPopup,
}) {
	const [difficulty, setDifficulty] = useState(gridConfig)
	const { rows, columns, mines } = difficulty

	const easyConfig = () => {
		setDifficulty({ rows: 9, columns: 9, mines: 10 })
	}

	const mediumConfig = () => {
		setDifficulty({ rows: 16, columns: 16, mines: 40 })
	}

	const hardConfig = () => {
		setDifficulty({ rows: 16, columns: 30, mines: 99 })
	}

	const handlePlay = () => {
		setGridConfig(difficulty)
		const newGrid = createGrid(rows, columns, mines)
		setBoard(newGrid.board)
		setMineLocation(newGrid.mineLocation)
		setNonMinecount(rows * columns - mines)
		setCounter(mines)
		setLost(false)
		setWon(false)
		setPopup(false)
	}

	return (
		<div className='fixed top-0 left-0 z-10 grid h-full w-full content-center justify-items-center overflow-hidden bg-submarine-900/90 uppercase '>
			<div className='w-11/12 max-w-xl border-[0.5px] border-submarine-500 bg-submarine-800'>
				<div className='grid justify-items-end border-b-[0.5px] border-submarine-500 py-1 pr-2 text-xl font-thin text-submarine-500'>
					<button onClick={() => setPopup(false)}>X</button>
				</div>
				<div>
					<p className='font-regular mx-5 py-10 text-center text-2xl font-light text-submarine-500 sm:text-3xl'>
						Choose your difficulty
					</p>
				</div>
				<div className='border-y-[0.5px] border-submarine-600 pt-3 pb-7'>
					<div className='mb-5 flex flex-col text-xs text-submarine-500 sm:flex-row sm:justify-center'>
						<button
							className={`mx-0 my-2 inline-block h-16 border-[0.5px] px-10 uppercase transition-all duration-300 hover:border-submarine-500 sm:mx-1 ${
								mines === 10
									? 'cursor-default border-submarine-500 bg-submarine-600 text-teal-200'
									: 'cursor-pointer border-submarine-600 hover:bg-submarine-700 hover:text-teal-200'
							}`}
							onClick={easyConfig}
						>
							Beginner
						</button>
						<button
							className={`mx-0 my-2 inline-block h-16 border-[0.5px] px-10 uppercase transition-all duration-300 hover:border-submarine-500 sm:mx-1 ${
								mines === 40
									? 'cursor-default border-submarine-500 bg-submarine-600 text-teal-200'
									: 'cursor-pointer border-submarine-600 hover:bg-submarine-700 hover:text-teal-200'
							}`}
							onClick={mediumConfig}
						>
							Intermediate
						</button>
						<button
							className={`mx-0 my-2 inline-block h-16 border-[0.5px] px-10 uppercase transition-all duration-300 hover:border-submarine-500 sm:mx-1 ${
								mines === 99
									? 'cursor-default border-submarine-500 bg-submarine-600 text-teal-200'
									: 'cursor-pointer border-submarine-600 hover:bg-submarine-700 hover:text-teal-200'
							}`}
							onClick={hardConfig}
						>
							Expert
						</button>
					</div>
					<div>
						<div className='my-5 mb-7 flex justify-center text-sm text-submarine-500'>
							<div className='mx-3 grid justify-items-center'>
								<p className='font-semibold'>Rows</p>
								<div className='grid h-16 w-20 items-center bg-submarine-700 text-submarine-400'>
									<p className='text-center'>{rows}</p>
								</div>
							</div>
							<div className='mx-3 grid justify-items-center'>
								<p className='font-semibold'>Columns</p>
								<div className='grid h-16 w-20 items-center bg-submarine-700 text-submarine-400'>
									<p className='text-center'>{columns}</p>
								</div>
							</div>
							<div className='mx-3 grid justify-items-center'>
								<p className='font-semibold'>Mines</p>
								<div className='grid h-16 w-20 items-center bg-submarine-700 text-submarine-400'>
									<p className='text-center'>{mines}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<button
						className='font-sm m-[1.5] inline-block h-16 w-full border-[0.5px] border-submarine-600 bg-submarine-600/30 px-10 text-sm font-semibold uppercase text-submarine-400 transition-all duration-300 hover:border-submarine-500 hover:bg-submarine-700 hover:text-teal-200'
						onClick={handlePlay}
					>
						Play
					</button>
				</div>
			</div>
		</div>
	)
}
