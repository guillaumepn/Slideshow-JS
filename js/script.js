var canClick = true;
var play;
var canPlay = true;

$.getJSON("https://www.skrzypczyk.fr/slideshow.php", function (data) {
	var nbImages = 0;
	$.each(data, function(key, value) {
		$("#rail").append("<img src=\""+ value["url"] +"\" desc=\""+ value["desc"] +"\" alt=\""+ value["title"] +"\">");
		nbImages++;
		//console.log($("img:eq(1)").css("height"));
	});
	
	$("#rail").css("width", nbImages*800);

});


function showNext(){
	if (canClick) {
		canClick = false;
		$("#rail").animate({
			marginLeft: "-=800"
		}, "slow", function() {
			var first = $("img:first");
			$("#rail img:last-child").after(first);
			$(this).css("margin-left", "+=800px");
			canClick = true;
		});
	}
}

$("#play").click(function(){
	if(canPlay == true){
		play = setInterval(showNext, 2000);
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


$("#next").click(showNext);

$("#previous").click(function() {
	if (canClick) {
		canClick = false;
		var last = $("img:last");
		$("#rail img:first-child").before(last);
		$("#rail").css("margin-left", "-=800px");
		$("#rail").animate({
			marginLeft: "+=800"
		}, "slow", function() {
			canClick = true;
		});
	}
});
