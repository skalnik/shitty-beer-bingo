define('BingoCard', function() {
  function BingoCard() {
    this.boardLabels = [
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer'],
      ['Beer', 'Beer', 'Beer', 'Beer', 'Beer']
    ];

    this.boardChecked = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ]
  }

  BingoCard.prototype.freespace = function(beer) {
    if(typeof beer != 'undefined') {
      this.boardLabels[2][2] = beer;
    }
    else {
      return this.boardLabels[2][2];
    }
  }

  BingoCard.prototype.checked = function(row, col) {
    return this.boardChecked[row][col];
  }

  BingoCard.prototype.check = function(row, col) {
    this.boardChecked[row][col] = true;
  }

  BingoCard.prototype.updateTable = function() {
    var card = this;
    this.eachSquare(function(row, col, beer, checked) {
      // Add 1 to the row to skip the title row
      var tableRow = document.querySelectorAll('tr')[row + 1];
      var square = tableRow.querySelectorAll('td')[col];
      square.innerText = beer;
      if(card.checked(row, col)) {
        square.classList.add('checked');
      } else {
        square.classList.remove('checked');
      }
    });
  }

  BingoCard.prototype.setLabel = function(row, col, val) {
    this.boardLabels[row][col] = val;
  }

  BingoCard.prototype.eachSquare = function(callback) {
    var rows = this.boardLabels.length;
    var cols = this.boardLabels[0].length;

    for(var row = 0; row < rows; row++) {
      for(var col = 0; col < cols; col++) {
        callback(row, col, this.boardLabels[row][col], this.boardChecked[row][col]);
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
      card.setLabel(row, col, beerList[chosenIndex]);

      // Add the beer to our used list and remove it from original list
      beersUsed = beersUsed.concat(beerList[chosenIndex]);
      beerList = beerList.slice(0, chosenIndex).
                  concat(beerList.slice(chosenIndex + 1, beerList.length));
    });

    // Set the freespace last since we don't want overwrite in in `eachSquare`
    this.freespace(freespace);
  }

  BingoCard.prototype.save = function() {
    localStorage.setItem('shittyBeerBingoBoard', JSON.stringify(this.boardLabels));
  }

  BingoCard.prototype.load = function() {
    var newBoard = localStorage.getItem('shittyBeerBingoBoard');
    if(typeof newBoard != 'undefined' && newBoard != null) {
      try {
        this.boardLabels = JSON.parse(newBoard);
        return true;
      } catch(e) {
        alert("Couldn't properly load board so we're reseting :(");
        return false;
      }
    }
    else {
      return false;
    }
  }

  return BingoCard;
})
