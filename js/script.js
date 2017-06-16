$(document).ready(function() {

	var canClick = true;
	var play;
	var canPlay = true;
	var watchHover = false;

	$.getJSON("https://www.skrzypczyk.fr/slideshow.php", function (data) {
		var nbImages = 0;
		$.each(data, function(key, value) {
			$("#rail").append("<img src=\""+ value["url"] +"\" data-nb=\""+ nbImages + "\" data-desc=\""+ value["desc"] +"\" data-title=\""+ value["title"] +"\">");
			$(".navigator").append("<i class='fa fa-circle-o' data-nbnav='" + nbImages + "' aria-hidden='true'></i>");
			nbImages++;
		});
		
		displayTitle();

		$("#rail").css("width", nbImages*800);

	});

	function showNext(){
		$('.navigator').css({
				color: "transparent"
			});
		$('.info').css({
				textShadow: "0 0 #fff"
			});
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
		$("[data-nbnav]").each(function(){
			if ($(this).attr("data-nbnav") == $("#rail img:first").attr("data-nb")){
				$(this).removeClass("fa-circle-o");
				$(this).addClass("fa-circle");
			}else{
				$(this).removeClass("fa-circle");
				$(this).addClass("fa-circle-o");
			}
		});
		$('.title').text($("#rail img:first").attr("data-title"));
		$('.desc').text($("#rail img:first").attr("data-desc"));
		
		$('.info').animate({
			marginTop: "-=150"
		}, "fast", function() {
			$('.info').css({
				textShadow: "3px 2px rgba(0,0,0,0.5)"
			});
			$('.navigator').css({
				color: "#eee"
			});
		});
	}

	function removeTitle() {
		$('.title').text($("#rail img:first").attr("data-title"));
		$('.desc').text($("#rail img:first").attr("data-desc"));
		$('.info').css({
				textShadow: "0 0 #fff"
			});
		$('.info').animate({
			marginTop: "+=150"
		}, "fast", function() {
			$('.info').css({
				textShadow: "0 0 #fff"
			});
			$('.navigator').css({
				color: "transparent"
			});
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
		$('.navigator').css({
				color: "transparent"
			});
		$('.info').css({
				textShadow: "0 0 #fff"
			});
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

	$('body').on('click', '[data-nbnav]', function() {
		var bullet = $(this);
		console.log(bullet.attr('data-nbnav'));
	});

});