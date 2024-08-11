#!/usr/bin/node

$(function(){
	let amenityList = [];

	$(".amenities input[type='checkbox']").change(function(){
		let amenityID = $(this).val();
		let amenityName = $(this).siblings('label').text();

		if ($(this).is(':checked')) {
			amenityList[amenityID] = amenityName;
		} else {
			delete amenityList[amenityID];
		}
		
		$('.amenities h4').text(Object.values(amenityList).join(", "));
	});

	let url = "http://0.0.0.0:5001/api/v1/status/";
	$.get(url, function(data)){
		if (data.status == "OK"){
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}.fail(function(){
			$('div#api_status').removeClass('available');
		});
	}

	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({}),
		success: function(data){
			const place;
			for (place of data){
				$("section.places").append(
					`<article>
						<div class="title_box">
							<h2>${place.name}</h2>
							<div class="price_by_night">
								$${place.price_by_night}
							</div>
						</div>
						<div class="information">
							<div class="max_guest">
								${place.max_guest} Guests
							</div>
							<div class="number_rooms">
								${place.number_rooms} Bedrooms
							</div>
							<div class="number_bathrooms">
								${place.number_bathrooms} Bathrooms
							</div>
						</div>
						<div class="description">
							${place.description}
						</div>
					</article>`
				);
			}
		},
		error: function(error){
			console.error("There was an error fetching the places:",error)
		}
	});
});
