define(function(require) {
  var BingoCard = require('bingoCard');
  var card = new BingoCard();

  if(card.load()) {
    card.updateTable();
  }
  else {
    regenerateCard();
  }

  document.querySelector('button.js-reset').addEventListener('click', function() {
    if(confirm("Are you sure you want to reset your board?")) {
      regenerateCard();
    }
  });

  function regenerateCard() {
    var request = new XMLHttpRequest();
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
