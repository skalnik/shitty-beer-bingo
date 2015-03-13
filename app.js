(function() {
  function ready(fn) {
    if (document.readyState != "loading"){
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function() {
    var request = new XMLHttpRequest();
    request.open("GET", "beers.json", true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var beers = JSON.parse(request.responseText)['beers'];

        // First beer is the free space beer
        document.querySelector('td#freespace').innerText = beers[0];
        beers = beers.slice(1, beers.length);

        // Populate each table element with a beer, using each one once before repeating
        var beersUsed = [];
        var spaces = document.querySelectorAll('td:not(#freespace)');
        for(var i = 0; i < spaces.length; i++) {
          // If we've used all the beers, restart the list
          if(beers.length < 1) {
            beers = beersUsed.slice(0);
            beersUsed = [];
          }

          var chosenIndex = Math.floor(Math.random() * beers.length);
          spaces[i].innerText = beers[chosenIndex];

          // Add the beer to our used list and remove it from original list
          beersUsed.concat(beers[chosenIndex]);
          beers = beers.slice(0, chosenIndex).concat(beers.slice(chosenIndex + 1, beers.length));
        }
      }
    };
    request.send();
  });
})();
