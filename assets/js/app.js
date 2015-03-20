define(function(require) {
  var BingoCard = require('BingoCard');
  var card = new BingoCard();
  var request = new XMLHttpRequest();

  // Card loads from localStorage
  if(card.load()) {
      card.updateTable();
  }
  // Lets generate a card
  else {
    request.open("GET", "beers.json", true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        beers = JSON.parse(request.responseText)['beers'];
        card.generate(beers);
        card.save();
        card.updateTable();
      }
    };

    request.send();
  }
});
