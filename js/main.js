// ---- Variables ---- //
// Main container
var $container = $(".container");
// Players names
var players = { p1: "", p2: "" };
// Winning Intervals
var winningInterval = [];
// Which turn
var isP1Turn = true;
// Game over
var gameOver = false;
var againstAI = false;
// Row size (Row size of 3 means 3*3 grid)
var rowSize = 3;
// Board variable
var $board;
// Squares in the grid
var $tiles;
// Replay button
var replayBtn;
// Variables to hold plays
var oArr = [],
	xArr = [];
// ---- Functions ---- //
// Load main page
function loadApp() {
	// Heading
	var h2 = $("<h2/>").text("Let's play some pro TicTacTo");
	$container.append(h2);
	// Generate elements and add them in a container
	var miniContainer = $("<div/>").addClass("mini-container");
	// Paragraph
	var p = $("<p/>").text("You can write your name(s) if you wnat");
	miniContainer.append(p);

	// Get preferences
	// TODO: Div for game play selection
	var div = $("<div/>").addClass("players");
	var radio = $("<input type='radio' id='pvp' checked value='p'>").click(changePlayer);
	div.append(radio);
	var label = $("<label>").attr("for", "pvp").text("Player vs. Player");
	div.append(label);
	div.append($("<br>"));
	var radio = $("<input type='radio' id='pvai' value='ai'>").click(changePlayer);
	div.append(radio);
	var label = $("<label>").attr("for", "pvai").text("Player vs. AI");
	div.append(label);
	miniContainer.append(div);
	
	div = $("<div/>").addClass("players");
	// Input for names
	var input = $("<input type='text' placeholder='Player 1'>").on("input", getNames);
	div.append(input);
	div.append($("<br>"));
	input = $("<input type='text' placeholder='Player 2'>").on("input", getNames);
	div.append(input);

	miniContainer.append(div);

	// Grid preference 
	var gridPreference = $("<div/>").addClass("grid-area");
	label = $("<label/>").text("Grid Area: ");
	gridPreference.append(label);
	radio = $("<input type='radio' id='grid3' checked value='3'>").click(setDifficulty);
	gridPreference.append(radio);
	label = $("<label/>").attr("for", "grid3").text("3x3");
	gridPreference.append(label);
	radio = $("<input type='radio' id='grid4' value='4'>").click(setDifficulty);
	gridPreference.append(radio);
	label = $("<label/>").attr("for", "grid4").text("4x4");
	gridPreference.append(label);
	radio = $("<input type='radio' id='grid5' value='5'>").click(setDifficulty);
	gridPreference.append(radio);
	label = $("<label/>").attr("for", "grid5").text("5x5");
	gridPreference.append(label);
	miniContainer.append(gridPreference);

	var btn = $("<button/>").text("Play").click(gameInit);
	miniContainer.append(btn);
	// Add mini container to the main container
	$container.append(miniContainer);
}

// Change players function
function changePlayer(e){
	var radios = $(".players input[type=radio]");
	for(r of radios) r.checked = false;
	this.checked = true;
	if(this.value === 'p') {
		againstAI = false;
		$(".players input[placeholder='Player 2']").slideDown("fast");
	}
	else {
		againstAI = true;
		$(".players input[placeholder='Player 2']").slideUp("fast");
	}
}

// Set difficulty level based on selection
function setDifficulty(e){
	var btns = $(".grid-area input");
	for (i of btns) i.checked = false;
	this.checked = true;
	rowSize = this.value;
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
	gameOver = false;
	$(".score-container").remove();
	if (players.p1 === "") players.p1 = "P1";
	if (players.p2 === "" && !againstAI) players.p2 = "P2";
	if(againstAI) players.p2 = "AI";
	// Remove content with animation
	$container.fadeOut("fast");
	setTimeout(() => {
		$container.empty();
		startGame();
	}, 500);
}

// Start the game
function startGame(e) {

	var scoreContainer = $("<div/>").addClass("score-container");

	var p = $("<p/>").text(players.p1+" ").append($("<span class='O'>O</span>"));
	scoreContainer.append(p);
	var div = $("<div/>").text("0 - 0");
	scoreContainer.append(div);
	p = $("<p/>").text(players.p2+" ").append($("<span class='X'>X</span>"));
	scoreContainer.append(p);
	$container.before(scoreContainer);
	$($(".score-container p")[0]).addClass("current-turn");
	// console.log($($(".score-container p")[0]).addClass("a"));

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
	$tiles = $(".tile");
	// Set time out to show
	setTimeout(() => {
		$container.fadeIn("fast");
	}, 500);

	var replayBtn = $("<button/>").text("Replay").css({"display": "block", "margin":"auto"}).addClass("replay").click(reset);
	replayBtn.hide();
	$container.append(replayBtn);
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
	$(this).text(toPlay).addClass(toPlay);
	$(".score-container div").className = toPlay;
	// Check for match
	checkForMatch();
	// Switch turns
	if(!gameOver) switchTurns();
}

function switchTurns(){
	if(gameOver) return;
	isP1Turn = !isP1Turn;
	$(".score-container p").toggleClass("current-turn");
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
				didWin(patterns[i][j]);
				return;
			} else if (patterns[i][j].every(isX)) {
				// TODO: Call winning and return
				console.log("It is all X");
				didWin(patterns[i][j]);
				return;
			}
		}
	}
}

// Test if all elements are match for X or O
function isO(currentVal) { return $("#" + currentVal).text() === "O"; }
function isX(currentVal) { return $("#" + currentVal).text() === "X"; }

function togglePattern(id) {
	winningInterval.push(setInterval(()=>{$("#"+id).toggleClass("winning-tile")}, 500));
}

function didWin(winningPattern){
	gameOver = true;
	for(var t of $tiles) {
		$(t).off("click");
		$(t).addClass("tile-nohover");
		$(t).removeClass("tile");
	}
	for(id of winningPattern) togglePattern(id);
	setTimeout(()=>{
		$(".replay").show("slow");
	},1000);
}

function reset(){
	gameInit();
	for(interval of winningInterval){
		clearInterval(interval);
	}

}

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
