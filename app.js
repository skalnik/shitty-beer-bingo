(function() {
  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    var request = new XMLHttpRequest();
    request.open('GET', '/beers.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var beers = JSON.parse(request.responseText);
        console.log(beers);
      }
    };
  });
})();
