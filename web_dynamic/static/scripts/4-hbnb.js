$(document).ready(function() {
  let amenityIds = {};
  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenityIds[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityIds[$(this).data('id')];
    }
    let amenities = Object.values(amenityIds);
    if (amenities.length === 0) {
      $('.amenities h4').html(' ');
    } else {
      $('.amenities h4').text(amenities.join(', '));
    }
  });

  function fetchPlaces(data = {}) {
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (data) {
        $('.places').empty(); // Clear the places section before appending new places
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          const article = $('<article>');
    
          const titleBox = $('<div class="title_box">');
          titleBox.append(`<h2>${place.name}</h2>`);
          titleBox.append(`<div class="price_by_night">$${place.price_by_night}</div>`);
          article.append(titleBox);
    
          const information = $('<div class="information">');
          information.append(`<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>`);
          information.append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>`);
          article.append(information);
    
          const description = $('<div class="description">').html(place.description);
          article.append(description);
    
          $('.places').append(article);
        }
      }
    });
  }

  fetchPlaces();

  $('button').click(function () {
    const data = { amenities: Object.keys(amenityIds) };
    fetchPlaces(data);
  });

  // Request to check the status
  $.get('http://localhost:5001/api/v1/status/', function(data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
