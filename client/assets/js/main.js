$(function(){
	$(".commandments-list").on("click", ".arrow", function toggle() {
		$(this).closest("li").find(".preview").slideToggle();
	});

	$(".hamburger").on("click", function onHaburgerClick() {
		$("body").toggleClass("nav-open");
	});
});