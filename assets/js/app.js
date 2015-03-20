define(function(require) {
  var BingoCard = require('BingoCard');
  var card = null;
  var request = new XMLHttpRequest();

  request.open("GET", "beers.json", true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var beers = JSON.parse(request.responseText)['beers'];
      card = BingoCard.generate(beers);
      card.updateTable();
    }
  };

  request.send();
});
