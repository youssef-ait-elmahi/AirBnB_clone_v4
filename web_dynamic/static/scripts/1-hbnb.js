
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
  });
  