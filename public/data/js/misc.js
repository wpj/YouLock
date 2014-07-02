$(function() {

  $('.pac-item').mousedown(function() {
    console.log("Pac item clicked.");
  });

  $('#searchBox').focus(function() {
    console.log("Focused.");
  });
});

// $('.pac-container').mousedown(function() {
//   console.log("Pac item clicked.");
// });

// $('.pac-item').append('<p>blah</p>');