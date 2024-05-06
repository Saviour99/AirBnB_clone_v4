#!/usr/bin/node

$(function(){
	let amenityIDs = [];

	$(".amenities input[type='checkbox']").change(function(){
		let amenityID = $(this).val();
		let amenityName = $(this).siblings('label').text();

		if ($(this).is(':checked')) {
			amenityIDs[amenityID] = amenityName;
		} else {
			delete amenityIDs[amenityID];
		}
		
		$('.amenities h4').text(Object.values(amenityIDs).join(", "));
	});
});
