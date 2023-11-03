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
      $('.amenities h4').html(' ');
    } else {
      $('.amenities h4').text(amenities.join(', '));
    }
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
