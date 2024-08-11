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
});
