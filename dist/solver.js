"use strict";

function saveEmptyPositions(board) {
	var emptyPositions = [];

	for (var i in board) {
		for (var j in board[i]) {
			if (board[i][j] === 0) {
				emptyPositions.push([i, j]);
			}
		}
	}

	return emptyPositions;
};

function checkRow(board, row, value) {
	for (var i in board[row]) {
		if (board[row][i] === value) {
			return false;
		}
	}
	return true;
};

function checkColumn(board, column, value) {
	for (var i in board) {
		if (board[i][column] === value) {
			return false;
		}
	}
	return true;
};

function check3x3Square(board, column, row, value) {
	var columnCorner = 0,
	    rowCorner = 0,
	    squareSize = 3;

	while (column >= columnCorner + squareSize) {
		columnCorner += squareSize;
	}

	while (row >= rowCorner + squareSize) {
		rowCorner += squareSize;
	}

	for (var i = rowCorner; i < rowCorner + squareSize; i++) {
		for (var j = columnCorner; j < columnCorner + squareSize; j++) {
			if (board[i][j] === value) {
				return false;
			}
		}
	}

	return true;
};

function checkValue(board, column, row, value) {
	if (checkRow(board, row, value) && checkColumn(board, column, value) && check3x3Square(board, column, row, value)) {
		return true;
	} else {
		return false;
	}
};

function solvePuzzle(board, emptyPositions) {
	var limit = 9,
	    i,
	    row,
	    column,
	    value,
	    found;
	for (i = 0; i < emptyPositions.length;) {
		row = emptyPositions[i][0];
		column = emptyPositions[i][1];
		value = board[row][column] + 1;
		found = false;

		while (!found && value <= limit) {
			if (checkValue(board, column, row, value)) {
				found = true;
				board[row][column] = value;
				i++;
			} else {
				value++;
			}
		}

		if (!found) {
			board[row][column] = 0;
			i--;
		}
	}

	board.forEach(function (row) {
		console.log(row.join());
	});
	return board;
}
/*var board = [
	[1, 0, 0, 0, 0, 0, 0, 0, 2],
	[0, 9, 0, 4, 0, 0, 0, 5, 0],
	[0, 0, 6, 0, 0, 0, 7, 0, 0],
	[0, 5, 0, 9, 0, 3, 0, 0, 0],
	[0, 0, 0, 0, 7, 0, 0, 0, 0],
	[0, 0, 0, 8, 5, 0, 0, 4, 0],
	[7, 0, 0, 0, 0, 0, 6, 0, 0],
	[0, 3, 0, 0, 0, 9, 0, 8, 0],
	[0, 0, 2, 0, 0, 0, 0, 0, 0]
];

console.log(solvePuzzle(board, saveEmptyPositions(board)));*/

document.getElementById("solver").addEventListener('click', function (e) {
	var g = [];
	for (var i = 1; i <= 9; i++) {
		var r = [];
		for (var j = 1; j <= 9; j++) {
			var e = document.getElementById("c" + i + j);
			if (e.value) {
				r.push(parseInt(e.value));
			} else r.push(0);
		}
		g.push(r);
	}

	var solution = solvePuzzle(g, saveEmptyPositions(g));

	for (var i = 1; i <= 9; i++) {
		for (var j = 1; j <= 9; j++) {
			var e = document.getElementById("d" + i + j);
			e.value = solution[i - 1][j - 1];
		}
	}
});