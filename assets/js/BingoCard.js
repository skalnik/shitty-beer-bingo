define('BingoCard', function() {
  function BingoCard() {
    this.board = [
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer']
    ];
  }

  BingoCard.prototype.freespace = function(beer) {
    if(typeof beer != 'undefined') {
      this.board[2][2] = beer;
    }
    else {
      return this.board[2][2];
    }
  }

  BingoCard.prototype.updateTable = function() {
    this.eachSquare(function(row, col, beer) {
      // Add 1 to the row to skip the title row
      var tableRow = document.querySelectorAll('tr')[row + 1];
      var square = tableRow.querySelectorAll('td')[col];
      square.innerText = beer;
    });
  }

  BingoCard.prototype.set = function(row, col, val) {
    this.board[row][col] = val;
  }

  BingoCard.prototype.eachSquare = function(callback) {
    var rows = this.board.length;
    var cols = this.board[0].length;

    for(var row = 0; row < rows; row++) {
      for(var col = 0; col < cols; col++) {
        callback(row, col, this.board[row][col]);
      }
    }
  }

  BingoCard.prototype.generate = function(beerList) {
    // First beer is the free space beer
    var freespace = beerList[0];
    beerList = beerList.slice(1, beerList.length);

    // Populate each table element with a beer, using each one once before repeating
    var beersUsed = [];

    var card = this;
    this.eachSquare(function(row, col, element) {
      if(beerList.length < 1) {
        beerList = beersUsed.slice(0);
        beersUsed = [];
      }

      var chosenIndex = Math.floor(Math.random() * beerList.length);
      card.set(row, col, beerList[chosenIndex]);

      // Add the beer to our used list and remove it from original list
      beersUsed = beersUsed.concat(beerList[chosenIndex]);
      beerList = beerList.slice(0, chosenIndex).
                  concat(beerList.slice(chosenIndex + 1, beerList.length));
    });

    // Set the freespace last since we don't want overwrite in in `eachSquare`
    this.freespace(freespace);
  }

  BingoCard.prototype.save = function() {
    localStorage.setItem('shittyBeerBingoBoard', this.board);
  }

  BingoCard.prototype.load = function() {
    var newBoardList = localStorage.getItem('shittyBeerBingoBoard');
    if(typeof newBoardList != 'undefined' && newBoardList != null) {
      newBoardList = newBoardList.split(',');
      var newBoard = [
        newBoardList.slice(0, 5),
        newBoardList.slice(5, 10),
        newBoardList.slice(10, 15),
        newBoardList.slice(15, 20),
        newBoardList.slice(20, 25)
      ];
      this.board = newBoard;
      return true;
    }
    else {
      return false;
    }
  }

  return BingoCard;
})
