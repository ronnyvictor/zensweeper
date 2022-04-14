export function revealByFlags(board, x, y, mineLocation, newNonMines) {
	const cell = board[x][y]
	const { value } = cell
	let adjacentCells = []
	let flags = 0

	if (
		x > 0 &&
		y > 0 &&
		!board[x - 1][y - 1].flagged &&
		!board[x - 1][y - 1].revealed
	) {
		adjacentCells.push(board[x - 1][y - 1])
	} else if (x > 0 && y > 0 && board[x - 1][y - 1].flagged) {
		flags++
	}

	if (
		x < board.length - 1 &&
		y < board[0].length - 1 &&
		!board[x + 1][y + 1].flagged &&
		!board[x + 1][y + 1].revealed
	) {
		adjacentCells.push(board[x + 1][y + 1])
	} else if (
		x < board.length - 1 &&
		y < board[0].length - 1 &&
		board[x + 1][y + 1].flagged
	) {
		flags++
	}

	if (
		x > 0 &&
		y < board[0].length - 1 &&
		!board[x - 1][y + 1].flagged &&
		!board[x - 1][y + 1].revealed
	) {
		adjacentCells.push(board[x - 1][y + 1])
	} else if (x > 0 && y < board[0].length - 1 && board[x - 1][y + 1].flagged) {
		flags++
	}

	if (
		x < board.length - 1 &&
		y > 0 &&
		!board[x + 1][y - 1].flagged &&
		!board[x + 1][y - 1].revealed
	) {
		adjacentCells.push(board[x + 1][y - 1])
	} else if (x < board.length - 1 && y > 0 && board[x + 1][y - 1].flagged) {
		flags++
	}

	if (x > 0 && !board[x - 1][y].flagged && !board[x - 1][y].revealed) {
		adjacentCells.push(board[x - 1][y])
	} else if (x > 0 && board[x - 1][y].flagged) {
		flags++
	}

	if (
		y < board[0].length - 1 &&
		!board[x][y + 1].flagged &&
		!board[x][y + 1].revealed
	) {
		adjacentCells.push(board[x][y + 1])
	} else if (y < board[0].length - 1 && board[x][y + 1].flagged) {
		flags++
	}

	if (
		x < board.length - 1 &&
		!board[x + 1][y].flagged &&
		!board[x + 1][y].revealed
	) {
		adjacentCells.push(board[x + 1][y])
	} else if (x < board.length - 1 && board[x + 1][y].flagged) {
		flags++
	}

	if (y > 0 && !board[x][y - 1].flagged && !board[x][y - 1].revealed) {
		adjacentCells.push(board[x][y - 1])
	} else if (y > 0 && board[x][y - 1].flagged) {
		flags++
	}

	if (value === flags && adjacentCells.length) {
		for (let i = 0; i < adjacentCells.length; i++) {
			let { x, y } = adjacentCells[i]
			board[x][y].revealed = true
			newNonMines--
			if (board[x][y].value === 'X') {
				board[x][y].struck = true
				for (let i = 0; i < mineLocation.length; i++) {
					board[mineLocation[i][0]][mineLocation[i][1]].revealed = true
				}
			}
		}
		return { board, newNonMines }
	} else {
		return { board, newNonMines }
	}
}
