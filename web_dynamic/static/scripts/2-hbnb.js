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
});
