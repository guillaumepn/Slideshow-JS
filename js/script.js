var canClick = true;
var play;
var canPlay = true;

var json = '[{"url":"https:\/\/static.pexels.com\/photos\/292600\/pexels-photo-292600.jpeg","title":"La montagne","desc":"Elle est belle ma montagne"},{"url":"https:\/\/static.pexels.com\/photos\/192505\/pexels-photo-192505.jpeg","title":"La route","desc":"Elle est belle ma route"},{"url":"https:\/\/static.pexels.com\/photos\/66258\/staniel-cay-swimming-pig-seagull-fish-66258.jpeg","title":"La plage","desc":"Elle est belle ma page"}]'

json = json.replace("\\/", "/");


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
