$(document).ready(function () {
    const amenityIds = {};
    $('input[type="checkbox"]').change(function () {
      if (this.checked) {
        amenityIds[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenityIds[$(this).data('id')];
      }
      const amenities = Object.values(amenityIds);
      if (amenities.length === 0) {
        $('.amenities h4').html(' ');
      } else {
        $('.amenities h4').text(amenities.join(', '));
      }
    });
  
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (const place of data) {
          $('.places').append('<article>' + place.name + '</article>');
        }
      }
    });
  
    $.get('http://localhost:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
  });
  