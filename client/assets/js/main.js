$(function(){
	$(".commandments-list").on("click", ".arrow", function toggle() {
		var jThis = $(this),
			li = jThis.closest("li"),
			shownClass = "preview-shown";
		
		li.toggleClass(shownClass).siblings().removeClass(shownClass).find(".commandment-preview-container").slideUp();
		li.find(".commandment-preview-container").slideToggle();
	});

	$(".hamburger-container").on("click", function onHaburgerClick() {
		$("body").toggleClass("nav-open");
	});


	$(".new-commment").on("submit", function onSubmitCommment(e) {
		e.preventDefualt();

		var data = {
					"sid":1,
                    "name": "Shia!",
                    "email": "dsasd@gmail.com",
                    "date": "Sun Feb 26 2018",
                    "title": "NEAT!!",
                    "body": "Very Gut pshat!"
             	}

             $.ajax({
             	url:"/postComment",
             	type:"POST",
             	data:{data:data},
				contentType: "application/json",
             }).then(function onPostComment(data) {
             	debugger;
             }).catch(function(err){
             	debugger;
             });
		
	});
});


