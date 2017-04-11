var canClick = true;
var play;
var canPlay = true;

function showNext(){
	if (canClick) {
		canClick = false;
		$("#rail").animate({
			marginLeft: "-=400"
		}, "slow", function() {
			var first = $("img:first");
			$("#rail img:last-child").after(first);
			$(this).css("margin-left", "+=400px");
			canClick = true;
		});
	}
}

$("#play").click(function(){
	if(canPlay == true){
		play = setInterval(showNext, 1000);
		canPlay = false;
		$("#pauseOrPlay").removeClass("fa-play");
		$("#pauseOrPlay").addClass("fa-pause");
	}else{
		clearInterval(play);
		canPlay= true;
		$("#pauseOrPlay").removeClass("fa-pause");
		$("#pauseOrPlay").addClass("fa-play");
	}
});


$("#next").click( showNext);

$("#previous").click(function() {
	if (canClick) {
		canClick = false;
		var last = $("img:last");
		$("#rail img:first-child").before(last);
		$("#rail").css("margin-left", "-=400px");
		$("#rail").animate({
			marginLeft: "+=400"
		}, "slow", function() {
			canClick = true;
		});
	}
});
