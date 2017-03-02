$(function(){
	$(".commandments-list").on("click", ".commandment-preview-header", function toggle() {
		var jThis = $(this),
			li = jThis.closest("li"),
			shownClass = "preview-shown";
		
		li.toggleClass(shownClass).siblings().removeClass(shownClass).find(".commandment-preview-container").slideUp();
		li.find(".commandment-preview-container").slideToggle();
		$("body").toggleClass("preview-mode", $(".preview-shown").length);

	});

	$(".hamburger-container").on("click", function onHaburgerClick() {
		$("body").toggleClass("nav-open");
	});


	$(".new-commment").on("submit", function onSubmitCommment(e) {
		e.preventDefault();
		var jThis = $(this);
			id = jThis.find("[name=id]").val();
			name = jThis.find("[name=name]").val();
			date = jThis.find("[name=date]").val();
			email = jThis.find("[name=email]").val();
			title = jThis.find("[name=title]").val();
			body = jThis.find("[name=body]").val();

			var data = {
						"id":id,
        	            "name": name,
        	            "email": email,
        	            "date": date,
        	            "title": title,
        	            "body": body
        	     	}

       
		data = JSON.stringify(data);
             $.ajax({
             	url:"/postComment",
             	type:"POST",
             	data:data,
				contentType: "application/json",
             }).then(function onPostComment(data) {
             	location.reload();
             }).catch(function(err){
             	alert("Sorry, But your comment wasn't submitted!");
             });
		
	});
});


/*
fetch('postComment', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
	"sid":1,
	"name": "Shia!",
	"email": "dsasd@gmail.com",
	"date": "Sun Feb 26 2018",
	"title": "NEAT!!",
	"body": "Very Gut pshat!"
   })
});

*/