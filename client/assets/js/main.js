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


	postComment = function postComment() {
		fetch('quotes', {
  			method: 'put',
  			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify({
    		'name': 'Darth Vader',
    		'quote': 'I find your lack of faith disturbing.'
  		})
	})

	}
});


