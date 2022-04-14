export function revealCells(board, x, y, newNonMines) {
	let show = []
	show.push(board[x][y])

	while (show.length !== 0) {
		let cell = show.pop()
		let { x, y, revealed, flagged, value } = cell
		if (!revealed && !flagged) {
			newNonMines--
			cell.revealed = true
		}

		if (value !== 0) {
			break
		}

		if (
			x > 0 &&
			y > 0 &&
			board[x - 1][y - 1].value === 0 &&
			!board[x - 1][y - 1].flagged &&
			!board[x - 1][y - 1].revealed
		) {
			show.push(board[x - 1][y - 1])
		}

		if (
			x < board.length - 1 &&
			y < board[0].length - 1 &&
			board[x + 1][y + 1].value === 0 &&
			!board[x + 1][y + 1].flagged &&
			!board[x + 1][y + 1].revealed
		) {
			show.push(board[x + 1][y + 1])
		}

		if (
			x > 0 &&
			y < board[0].length - 1 &&
			board[x - 1][y + 1].value === 0 &&
			!board[x - 1][y + 1].falgged &&
			!board[x - 1][y + 1].revealed
		) {
			show.push(board[x - 1][y + 1])
		}

		if (
			x < board.length - 1 &&
			y > 0 &&
			board[x + 1][y - 1].value === 0 &&
			!board[x + 1][y - 1].flagged &&
			!board[x + 1][y - 1].revealed
		) {
			show.push(board[x + 1][y - 1])
		}

		if (
			x > 0 &&
			board[x - 1][y].value === 0 &&
			!board[x - 1][y].flagged &&
			!board[x - 1][y].revealed
		) {
			show.push(board[x - 1][y])
		}

		if (
			y < board[0].length - 1 &&
			board[x][y + 1].value === 0 &&
			!board[x][y + 1].flagged &&
			!board[x][y + 1].revealed
		) {
			show.push(board[x][y + 1])
		}

		if (
			x < board.length - 1 &&
			board[x + 1][y].value === 0 &&
			!board[x + 1][y].flagged &&
			!board[x + 1][y].revealed
		) {
			show.push(board[x + 1][y])
		}

		if (
			y > 0 &&
			board[x][y - 1].value === 0 &&
			!board[x][y - 1].flagged &&
			!board[x][y - 1].revealed
		) {
			show.push(board[x][y - 1])
		}

		if (
			x > 0 &&
			y > 0 &&
			!board[x - 1][y - 1].revealed &&
			!board[x - 1][y - 1].flagged
		) {
			board[x - 1][y - 1].revealed = true
			newNonMines--
		}

		if (y > 0 && !board[x][y - 1].revealed && !board[x][y - 1].flagged) {
			board[x][y - 1].revealed = true
			newNonMines--
		}

		if (
			x < board.length - 1 &&
			y > 0 &&
			!board[x + 1][y - 1].revealed &&
			!board[x + 1][y - 1].flagged
		) {
			board[x + 1][y - 1].revealed = true
			newNonMines--
		}

		if (x > 0 && !board[x - 1][y].revealed && !board[x - 1][y].flagged) {
			board[x - 1][y].revealed = true
			newNonMines--
		}

		if (
			x < board.length - 1 &&
			!board[x + 1][y].revealed &&
			!board[x + 1][y].flagged
		) {
			// Bottom Reveal
			board[x + 1][y].revealed = true
			newNonMines--
		}

		if (
			x > 0 &&
			y < board[0].length - 1 &&
			!board[x - 1][y + 1].revealed &&
			!board[x - 1][y + 1].flagged
		) {
			board[x - 1][y + 1].revealed = true
			newNonMines--
		}

		if (
			y < board[0].length - 1 &&
			!board[x][y + 1].revealed &&
			!board[x][y + 1].flagged
		) {
			board[x][y + 1].revealed = true
			newNonMines--
		}

		if (
			x < board.length - 1 &&
			y < board[0].length - 1 &&
			!board[x + 1][y + 1].revealed &&
			!board[x + 1][y + 1].flagged
		) {
			board[x + 1][y + 1].revealed = true
			newNonMines--
		}
	}

	return { board, newNonMines }
}
