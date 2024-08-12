#!/usr/bin/node

$(function(){
	let checkedAmenities = [];
	let checkedStates = [];
	let checkedCities = [];

	$(".amenities input[type='checkbox']").change(function(){
		let amenityID = $(this).val();
		let amenityName = $(this).siblings('label').text();

		if ($(this).is(':checked')) {
			checkedAmenities[amenityID] = amenityName;
		} else {
			delete checkedAmenities[amenityID];
		}
		
		$('.amenities h4').text(Object.values(checkedAmenities).join(", "));
	});

	$(".states input[type='checkbox']").change(function() {
	         let id = $(this).data('id');
	         let name = $(this).data('name');

	         if ($(this).is(':checked')) {
	                  checkedStates[id] = name;
	         } else {
	                  delete checkedStates[id];
	         }
	});

	$(".states ul input[type='checkbox']").change(function() {
	        let id = $(this).data('id');
	        let name = $(this).data('name');

	        if ($(this).is(':checked')) {
			checkedCities[id] = name;
	        } else {
			delete checkedCities[id];
	        }
	});

	let url = "http://0.0.0.0:5001/api/v1/status/";
	$.get(url, function(data)){
		if (data.status == "OK"){
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	}).fail(function(){
		$('div#api_status').removeClass('available');
		});

	$("button").click(function(){
		const amenitiesList = Object.keys(checkedAmenities);
		const statesList = Object.keys(checkedStates);
		const citiesList = Object.keys(checkedCities);

		const requestData = {
			amenities: amenitiesList,
			states: statesList,
			cities: citiesList
		};

		$.ajax({
                    url: 'http://0.0.0.0:5001/api/v1/places_search/',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(requestData),
                    success: function(data){
			    $("section.places").empty();  // Clear previous results
                            data.forEach(place => {
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
                            });
                    },
                    error: function(error){
                            console.error("There was an error fetching the places:",error)
                    }
        	});
	});

	$("#toggle-reviews").click(function() {
	        if (reviewsVisible) {
	            $("#review-list").empty();
	            $(this).text("show");
	            reviewsVisible = false;
	        } else {
		    $.get('http://0.0.0.0:5001/api/v1/reviews', function(data) {
		         $("#review-list").empty();
		         data.forEach(review => {
	                     $("#review-list").append(
	                        `<ul>
	                            <li>
	                               <h3>From ${review.user_name} the ${new Date(review.created_at).toLocaleDateString()}</h3>
	                               <p>${review.text}</p>
	                            </li>
	                         </ul>`
	                  );
		 });
		 $("#toggle-reviews").text("hide");
		 reviewsVisible = true;
         }).fail(function() {
              console.error("There was an error fetching the reviews.");
             });
	}	
    });
});
