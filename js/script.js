$(document).ready(function() {

	var canClick = true;
	var play;
	var canPlay = true;
	var watchHover = false;

	$.getJSON("https://www.skrzypczyk.fr/slideshow.php", function (data) {
		var nbImages = 0;
		$.each(data, function(key, value) {
			$("#rail").append("<img src=\""+ value["url"] +"\" data-desc=\""+ value["desc"] +"\" data-title=\""+ value["title"] +"\">");
			nbImages++;
		});
		
		displayTitle();

		$("#rail").css("width", nbImages*800);

	});

	function showNext(){
		if (canClick) {
			removeTitle();
			canClick = false;
			$("#rail").animate({
				marginLeft: "-=800"
			}, "slow", function() {
				var first = $("img:first");
				$("#rail img:last-child").after(first);
				$(this).css("margin-left", "+=800px");
				canClick = true;
				displayTitle();
			});
		}
	}

	function displayTitle() {
		$('.title').text($("#rail img:first").attr("data-title"));
		$('.title').animate({
			marginTop: "-=150"
		}, "fast", function() {
			$('.title').css({
				textShadow: "3px 2px rgba(0,0,0,0.5)"
			});
		});
		$('.desc').text($("#rail img:first").attr("data-desc"));
		$('.desc').animate({
			marginTop: "+=20"
		}, "slow", function() {
			$('.desc').css({
				textShadow: "3px 2px rgba(0,0,0,0.5)"
			});
		});
	}

	function removeTitle() {
		$('.title').text($("#rail img:first").attr("data-title"));
		$('.title').css({
				textShadow: "0 0 #fff"
			});
		$('.title').animate({
			marginTop: "+=150"
		}, "fast", function() {
			
		});
		$('.desc').text($("#rail img:first").attr("data-desc"));
		$('.desc').css({
				textShadow: "0 0 #fff"
			});
		$('.desc').animate({
			marginTop: "-=20"
		}, "slow", function() {

		});
	}

	$("#play").click(function(){
		if(canPlay == true){
			play = setInterval(showNext, 2000);
			canPlay = false;
			$("#pauseOrPlay").removeClass("fa-play");
			$("#pauseOrPlay").addClass("fa-pause");
		}else{
			clearInterval(play);
			canPlay = true;
			watchHover = false;
			$("#pauseOrPlay").removeClass("fa-pause");
			$("#pauseOrPlay").addClass("fa-play");
		}
	});

	$("#next").click(showNext);

	$("#previous").click(function() {
		if (canClick) {
			removeTitle();
			canClick = false;
			var last = $("img:last");
			$("#rail img:first-child").before(last);
			$("#rail").css("margin-left", "-=800px");
			$("#rail").animate({
				marginLeft: "+=800"
			}, "slow", function() {
				canClick = true;
				displayTitle();
			});
		}
	});

	$("#slideshow").hover(function() {	// Mouse enters
		if (!canPlay && watchHover) {
			clearInterval(play);
			console.log("in : " + play);
		}
	}, function() {						// Mouse leaves
		if (!canPlay && watchHover) {
			play = setInterval(showNext, 2000);
			console.log("out : " + play);
		} else if (!canPlay && !watchHover) {
			watchHover = true;
		}
	});

});