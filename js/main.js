// ---- Variables ---- //
// Board
var $board;
// Turn variable
var isP1 = true;
// Tiles variable
var $tiles;

// ---- Functions ---- //

// Start the game
function startGame() {
  // Set board
  $board = $(".board")
  // Get all tiles
  $tiles = $(".tile");
	// Give each an event listener
	for (var tile of $tiles) $(tile).click(tileClicked);
}
// When a tile is clicked
function tileClicked(e) {
	// Get the clicked tile's id
	var tileID = e.target.id;
	// If it is the first player's turn play "o", otherwise "x"
	var whatToPlay = isP1 ? "o" : "x";
	// Get the element by ID if it has one
	var $tile = tileID !== "" ? $("#" + tileID) : null;
	// If the element doesn't have an ID or it has children return
	if ($tile === null || $tile.children().length > 0) return;
	console.log("played: " + whatToPlay + ", at: " + tileID.substring(4));
	// Otherwise create div element
	var $el = $("<div/>");
	// Add the proper class
	$el.addClass(whatToPlay);
	// Append the new div to the tile
	$tile.append($el);
	// Check for winning
	// winningCheck();
	// Switch players
	isP1 = !isP1;
}

function winningCheck() {
	for (let i = 0; i < $tiles.length / 3; i++) {
    var arr = [];
    for (let j = 0; i < $tiles.length / 3; j++) {
      arr.push(`${i}${j}`);
    }
    console.log(arr);
	}
}

function won() {
	var $win = $(".winning-tile");
	setInterval(() => {
		$win.toggleClass("winning-tile");
	}, 500);
}

startGame();