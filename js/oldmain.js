// Get tiles
var $tiles = $(".tile");
// Winning Patterns
var p1Turn = true; // True first player, False second player
// Give each square on click event
for (tile of $tiles) $(tile).click(tileClicked);
var oArr = [];
var xArr = [];

function tileClicked(e) {
	if ($(this).children().length === 0) {
		// If it is player 1 turn
		var element = $("<div/>");
		if (p1Turn) {
			element.addClass("o");
			oArr.push(this.id);
		} else {
			element.addClass("x");
			xArr.push(this.id);
		}
		$(this).append(element);
		// Switch turns
		p1Turn = !p1Turn;
		winningCheck();
		// testing();
	}
}

function winningCheck() {
	var playerWon = "";
	var gameOver = false;
	if(checkFor(oArr)) {
		playerWon = "O";
		gameOver = true;
	}
	else if(checkFor(xArr)) {
		playerWon = "X";
		gameOver = true;
	}
	if(gameOver){
		for (let i = 0; i < $tiles.length; i++) {
			$($tiles[i]).off("click");
		}
		setTimeout(()=>{alert("Yay player '"+playerWon+"' won!")}, 100);
	}
}

function checkFor(arr) {

	var completeRow =
		(arr.includes("00") && arr.includes("01") && arr.includes("02")) ||
		(arr.includes("10") && arr.includes("11") && arr.includes("12")) ||
		(arr.includes("20") && arr.includes("21") && arr.includes("22"));
	var completeColumn =
		(arr.includes("00") && arr.includes("10") && arr.includes("20")) ||
		(arr.includes("01") && arr.includes("11") && arr.includes("21")) ||
		(arr.includes("02") && arr.includes("12") && arr.includes("22"));
	var completeCross =
		(arr.includes("00") && arr.includes("11") && arr.includes("22")) ||
		(arr.includes("02") && arr.includes("11") && arr.includes("20"));
	return (completeRow || completeColumn || completeCross);
}