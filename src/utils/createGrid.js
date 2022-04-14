export function createGrid(row, col, mines) {
	let board = []
	let mineLocation = []

	for (let x = 0; x < row; x++) {
		let subCol = []
		for (let y = 0; y < col; y++) {
			subCol.push({
				value: 0,
				revealed: false,
				flagged: false,
				struck: false,
				x,
				y,
			})
		}
		board.push(subCol)
	}

	let bombsCount = 0
	while (bombsCount < mines) {
		let x = random(0, row - 1)
		let y = random(0, col - 1)
		if (board[x][y].value === 0) {
			board[x][y].value = 'X'
			mineLocation.push([x, y])
			bombsCount++
		}
	}

	for (let x = 0; x < row; x++) {
		for (let y = 0; y < col; y++) {
			if (board[x][y].value === 'X') {
				continue
			}

			if (x > 0 && board[x - 1][y].value === 'X') {
				board[x][y].value++
			}

			if (x > 0 && y < col - 1 && board[x - 1][y + 1].value === 'X') {
				board[x][y].value++
			}

			if (y < col - 1 && board[x][y + 1].value === 'X') {
				board[x][y].value++
			}

			if (x < row - 1 && y < col - 1 && board[x + 1][y + 1].value === 'X') {
				board[x][y].value++
			}

			if (x < row - 1 && board[x + 1][y].value === 'X') {
				board[x][y].value++
			}

			if (x < row - 1 && y > 0 && board[x + 1][y - 1].value === 'X') {
				board[x][y].value++
			}

			if (y > 0 && board[x][y - 1].value === 'X') {
				board[x][y].value++
			}

			if (x > 0 && y > 0 && board[x - 1][y - 1].value === 'X') {
				board[x][y].value++
			}
		}
	}
	return { board, mineLocation }
}

function random(min = 0, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
