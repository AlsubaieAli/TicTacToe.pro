// ---- Variables ---- //
// Main container
var $container = $(".container");
// Players names
var players = { p1: "", p2: "" };
// Which turn
var isP1Turn = true;
// Row size (Row size of 3 means 3*3 grid)
var rowSize = 3;
// Board variable
var $board;
// Squares in the grid
var $tiles;
// Variables to hold plays
var oArr = [],
	xArr = [];
// ---- Functions ---- //
// Load main page
function loadApp() {
	var h2 = $("<h2/>").text("Welcome to (TicTacTo).pro");
	$container.append(h2);
	// Generate elements
	var miniContainer = $("<div/>").addClass("mini-container");
	var p = $("<p/>").text("You can write your names if you wnat");
	var input1 = $("<input>").attr("placeholder", "Player 1").on("input", getNames);
	var input2 = $("<input>").attr("placeholder", "Player 2").on("input", getNames);
	var btn = $("<button/>")
		.text("Play")
		.click(gameInit);
	// Add elements to minicontainer
	miniContainer.append(p);
	miniContainer.append(input1);
	miniContainer.append(input2);
	miniContainer.append(btn);
	// Add mini container to the main container
	$container.append(miniContainer);
}

// Get names on key up (while typing)
function getNames(e) {
	// Get the last character of the placeholder
	var player = this.placeholder.charAt(this.placeholder.length - 1);
	// Set the names properly
	if (player === "1") players.p1 = this.value;
	if (player === "2") players.p2 = this.value;
}

// Initialize the game
function gameInit(e) {
	if (players.p1 === "") players.p1 = "P1";
	if (players.p2 === "") players.p2 = "P2";
	// Remove content with animation
	$container.fadeOut("fast");
	setTimeout(() => {
		$container.empty();
		startGame();
	}, 500);
}

// Start the game
function startGame(e) {
	// TODO: Display turns and players names
	// Add board div
	$board = $("<div/>").addClass("board");
	// Give it proper grid size
	$board.css("grid-template-columns", "repeat(" + rowSize + ", 1fr)");
	$board.css("grid-template-rows", "repeat(" + rowSize + ", 1fr)");

	// Generate tiles based on row size
	for (let i = 0; i < rowSize; i++) {
		for (let j = 0; j < rowSize; j++) {
			let tile = $("<div/>").addClass("tile");
			tile.attr("id", "" + i + j).click(tileClicked);
			$board.append(tile);
		}
	}
	// Add to container
	$container.append($board);
	// Set time out to show
	setTimeout(() => {
		$container.fadeIn("fast");
	}, 500);
	// TODO: Stats
}

// On square click
function tileClicked(e) {
	// Check what to play
	var toPlay = isP1Turn ? "O" : "X";
	// Remove event from the clicked tile
	$(this).off("click");
	// Push the play accordingly to the proper array
	isP1Turn ? oArr.push(this.id) : xArr.push(this.id);
	$(this).text(toPlay);
	// Check for match
	checkForMatch();
	// Switch turns
	isP1Turn = !isP1Turn;
}

// Check for match function
function checkForMatch() {
	// Return if no one played at least 3 times
	if (oArr.length < rowSize && xArr.length < rowSize) return;
	// Get the winning patterns
	var patterns = getPatterns();
	// Loop through patterns and finish the game if match is found
	for (let i = 0; i < patterns.length; i++) {
		for (let j = 0; j < patterns[i].length; j++) {
			if (patterns[i][j].every(isO)) {
				// TODO: Call winning and return
				console.log("It is all O");
			} else if (patterns[i][j].every(isX)) {
				// TODO: Call winning and return
				console.log("It is all X");
			}
		}
	}
}

// Test if all elements are match for X or O
function isO(currentVal) { return $("#" + currentVal).text() === "O"; }
function isX(currentVal) { return $("#" + currentVal).text() === "X"; }

// Get patterns function: it loops through the grid to identify the winning patterns
function getPatterns() {
	var rows = [],
		cols = [],
		cross1 = [],
		cross2 = [];
	for (let i = 0; i < rowSize; i++) {
		var aRow = [], aCol = [];
		for (var j = 0; j < rowSize; j++) {
			aRow.push("" + i + j);
			aCol.push("" + j + i);
			if (i === j) cross1.push("" + i + j);
		}
		rows.push(aRow);
		cols.push(aCol);
		cross2.push("" + i + (rowSize - i - 1));
	}
	return [rows, cols, [cross1, cross2]];
}
// Load app from beginning
loadApp();
