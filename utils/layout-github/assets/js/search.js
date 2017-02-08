// search

var client = algoliasearch("9O85UIKQEL", "1263a35d6826053ed3a72d47d6392533");
var index = client.initIndex('manual-zh');
autocomplete('#search-input', { hint: true }, [
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    displayKey: 'title',
    templates: {
      suggestion: function (suggestion) {
        return suggestion._highlightResult.title.value;
      }
    }
  }
]).on('autocomplete:selected', function (event, suggestion, dataset) {
  // console.log(suggestion, dataset);
  var path = suggestion.path + '.html';
  var navlist = document.getElementById('navigation');
  var items = navlist.getElementsByClassName('active');
  console.log(items);
  if (items && items.length > 0) {
    var li = items[0];
    var classList = li.classList;
    if (classList.contains('sidebar-header-1') ||
      classList.contains('sidebar-header-3')) {
      window.location.href = '../' + path;
    } else {
      window.location.href = '../../' + path;
    }
  } else {
    window.location.href = path;
  }
}); 