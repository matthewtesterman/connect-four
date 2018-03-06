var playerTurn = 1;
var player1Color = '#ff775f';
var player2Color = '#4799ff';
var overSelection = false;
var gameOn = true;

var gameGrid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
var selectionLocked = false;
$(function() {


  $("#Layer_2-2").html($("#Layer_2-2").html());
  $('.selection').click(function(e) {
    if (!selectionLocked && gameOn){
      selectionLocked = true;
      var column = $(this).attr('id').substr(1,2);
      console.log(gameGrid);
      if (addTokenToColumn(column, this)) {

      }

    }
  });

  $('.selection').mouseenter(function(e) {
    overSelection = true;
    if (playerTurn == 1 && !selectionLocked && !$(this).hasClass('motion') && gameOn) {
      $(this).css({'fill': player1Color});
    }
    else if (playerTurn == 2 && !selectionLocked && !$(this).hasClass('motion') && gameOn) {
      $(this).css({'fill': player2Color});
    }
    else if (!selectionLocked && !$(this).hasClass('motion') && gameOn) {
      $(this).css({'background-color': 'transparent'})
    }
  }).mouseleave(function(e){
    overSelection = false;
    if (!$(this).hasClass('motion') && gameOn){
      $(this).css('fill', 'transparent');}
    });

  });

  //Add Token Piece to column
  function addTokenToColumn(column, selectObj) {
    for (var row = gameGrid.length - 1; row >= 0; row--) {
      if (gameGrid[row][column] == '0') {
        gameGrid[row][column] = playerTurn;
        var cssid = '#_' + row + '' + column;
        var mToken = '#m' + $(selectObj).attr('id');
        updateView(cssid, selectObj, mToken);
        selectionLocked = false;

        return true;
      }
      //If column is already filled
      else if (row === 0 && gameGrid[row][column] !== '0') {
        displayMessage('Column is full');
        selectionLocked = false;
        return false;
      }
    }

  }
  function updateView(cssid, selectObj, mToken) {
    var selectObjDest = $(cssid).attr('cy');

    //$(selectObj).attr('class', "selection motion");

    if (playerTurn === 1) {
      $(selectObj).css('fill', player2Color);
      $(mToken).css('fill', player1Color);
      $(mToken).animate({cy : selectObjDest}, function() {
        $(cssid).css({'fill' : player1Color});
        $(mToken).css('cy' , '33.26');

        $(mToken).css('fill', "#e5e5e5");
        checkForWinner();
      });
    }
    else if (playerTurn === 2) {
      $(selectObj).css('fill', player1Color);
      $(mToken).css('fill', player2Color);
      $(mToken).animate({cy : selectObjDest}, function() {
        $(cssid).css({'fill' : player2Color});
        $(mToken).css('cy' , '33.26');

        $(mToken).css('fill', "#e5e5e5");
        checkForWinner();
      });
    }
    tooglePlayer(selectObj);
  }
  //check to see if 4 connect
  function checkForWinner() {
    checkVerticle();
    checkHorizontal();
    checkDiagnal();
  }

  function checkHorizontal() {
    var previousPos = 0;
    var successions = 0;

    for (var row = 0; row < gameGrid.length; row++) {
      for(var column = 0; column < 7; column++) {
        if (previousPos === gameGrid[row][column] && previousPos !== 0) {
          successions = successions + 1;
        }
        else {

          successions = 1;
        }

        if (successions === 4) {
          declareWinner();
          return;
        }
        previousPos = gameGrid[row][column];
      }
      successions = 0;
      previousPos = 0;
    }
  }

  function checkVerticle() {
    var previousPos = 0;
    var successions = 0;
    var succTokens = new Array();
    for (var column = 0; column < 7; column++) {
      for (var row = gameGrid.length - 1; row >= 0; row--) {
        if (previousPos === gameGrid[row][column] && previousPos !== 0) {
          successions = successions + 1;
          succTokens.push('2');
        }
        else {
          succTokens = [];

          successions = 1;
          console.log(succTokens);
        }

        if (successions === 4) {
          console.log(succTokens);
          declareWinner();
          return;
        }
        previousPos = gameGrid[row][column];
      }
      successions = 0;
      previousPos = 0;
    }

  }

  function checkDiagnal() {
    //DOWN RIGHT (WORKS)
    x = 0; y = 0;
    starter = 0;
    previousPos = 0;
    successions = 0;

    while(starter < gameGrid.length) {
      for(var row = starter; row < gameGrid.length; row++) {
        if(previousPos === gameGrid[row][x] && previousPos !== 0) {
          successions++;
        }
        else {
          successions = 1;
        }

        if (successions === 4)
        {
          declareWinner();
          return; // exit loop
        }
        previousPos = gameGrid[row][x];
        //console.log(gameGrid[row][x]);
        if (x < gameGrid.length)
        {
          x++;
        }
      }
      x = 0;
      previousPos = 0;
      successions = 0;
      starter++;
    }


    //DOWN RIGHT (WORKS)
    x = 0; y = 0;
    starter = 6;
    previousPos = 0;
    successions = 0;

    while(starter >= 0) {
      for(var row = starter; row < gameGrid.length; row++) {

        if(previousPos === gameGrid[row][x] && previousPos !== 0) {
          successions++;
        }
        else {
          successions = 1;
        }

        if (successions === 4)
        {
          declareWinner();
          return; // exit loop
        }
        previousPos = gameGrid[row][x];
        x++;

      }
      x = 0;
      previousPos = 0;
      successions = 0;
      starter--;
    }
    //DOWN RIGHT (WORKS)
    x = 0; y = 0;
    starter = 6;
    previousPos = 0;
    successions = 0;

    while(starter >= 0) {
      for(var row = starter; row < gameGrid.length; row++) {
        if(previousPos === gameGrid[row][x] && previousPos !== 0) {
          successions++;
        }
        else {
          successions = 1;
        }

        if (successions === 4)
        {
          declareWinner();
          return; // exit loop
        }
        previousPos = gameGrid[row][x];
        x++;

      }
      x = 0;
      previousPos = 0;
      successions = 0;
      starter--;
    }


    //DOWN LEFT
    x = 6; y = 0;
    starter = 0;
    previousPos = 0;
    successions = 0;

    while(starter < gameGrid.length) {
      for(var row = starter; row < gameGrid.length; row++) {
        if(previousPos === gameGrid[row][x] && previousPos !== 0) {
          successions++;
        }
        else {
          successions = 1;
        }

        if (successions === 4)
        {
          declareWinner();
          return; // exit loop
        }
        previousPos = gameGrid[row][x];
        //console.log(gameGrid[row][x]);

        x--;
      }
      x = 6;
      previousPos = 0;
      successions = 0;
      starter++;
    }

    //UPLEFT

    starter = gameGrid.length - 1;
    x = 6;

    while(starter >= 0) {
      for(var row = starter; row >= 0; row--) {

        if(previousPos === gameGrid[row][x] && previousPos !== 0) {
          successions++;
        }
        else {
          successions = 1;
        }

        if (successions === 4)
        {
          declareWinner();
          return; // exit loop
        }
        previousPos = gameGrid[row][x];
        x--;
      }
      x = 6;
      previousPos = 0;
      successions = 0;
      starter--;
    }
  }


  function declareWinner() {
    if(playerTurn == 1) {
      $('circle').css('fill', player1Color)
    }
    else if (playerTurn == 2){
      $('circle').css('fill', player2Color)
    }

    displayMessage('Player' + playerTurn + ' Wins!');
    gameOver();
  }

  function gameOver() {
    gameOn = false;
  }
  function displayMessage(msg) {
    alert(msg);
  }



  function tooglePlayer(selectObj) {
    if (playerTurn === 1) {
      playerTurn = 2;
    }
    else if (playerTurn == 2){
      playerTurn = 1;
    }
  }
