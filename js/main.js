// ---- Variables ---- //
var $container = $(".container");
var players = {
  p1: "",
  p2: ""
}
var xArr;
var oArr;
var isP1Turn = true;
var rowSize = 3;
var $tiles;

// ---- Functions ---- //

function loadApp(){
  var h2 = $("<h2/>").text("Welcome to (TicTacTo).pro");
  $container.append(h2);

  var miniContainer = $("<div/>").addClass("mini-container");
  var p = $("<p/>").text("You can write your names if you wnat");
  miniContainer.append(p);

  var input = $("<input>").attr("placeholder", "Player 1").on("keyup", getNames);
  miniContainer.append(input);
  input = $("<input>").attr("placeholder", "Player 2").on("keyup", getNames);
  miniContainer.append(input);

  var btn = $("<button/>").text("Play").click(gameInit);
  miniContainer.append(btn);
  
  $container.append(miniContainer);
}

function getNames(e){
  var player = this.placeholder.charAt(this.placeholder.length-1);
  if(player === "1") players.p1 = this.value;
  if(player === "2") players.p2 = this.value;
}


function gameInit(e){
  if(players.p1 === "") players.p1 = "P1"
  if(players.p2 === "") players.p2 = "P2"
  xArr = [], oArr = [];
  $container.fadeOut();
  setTimeout(()=>{
    $container.empty()
    startGame();
  }, 500);
}

function startGame(e){
  
  var $board = $("<div/>").addClass("board");
  switch(rowSize){
    case 3:
      $board.addClass("board-size-3");
      break;
    case 4:
      $board.addClass("board-size-4");
      break;
    case 5:
      $board.addClass("board-size-5");
      break;
  }
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      let tile = $("<div/>").addClass("tile");
      tile.attr("id", ""+i+j).click(tileClicked);
      $board.append(tile);
    }
  }
  $container.append($board);
  setTimeout(()=>{$container.fadeIn()}, 500);
}

function tileClicked(e){
  var toPlay = $("<div/>").addClass((isP1Turn)?"o":"x");
  $(this).off("click"); // OR
  // if($(this).children().length > 0) return;
  (isP1Turn) ? oArr.push(this.id) : xArr.push(this.id);
  $(this).append(toPlay);
  winningCheck();
  isP1Turn = !isP1Turn;
}

function winningCheck(){
  if(oArr.length < 3 && xArr.length < 3) return;
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      
    }
  }
  console.log(oArr, xArr);
  console.log("Check if we have a winner");
}

// Load app from beginning
loadApp();