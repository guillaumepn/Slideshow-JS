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
		var first = $("img:first");		
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
				$("#rail img:last-child").after(first);
				$(this).css("margin-left", "+=800px");
				canClick = true;
				displayTitle();
			});
		}
		return first.attr('data-nb');
	}

	function showPrev() {
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
		return first.attr('data-nb');
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

	function goTo(bullet) {
		var img = $("[data-nb="+bullet+"]");
		var first = $("img:first");
		var last = $("img:last");
		var diff = img.attr('data-nb') - first.attr('data-nb');
		console.log(diff);
		var cpt = 0;
		if (diff > 0) {
			$("#rail").animate({
				marginLeft: "-="+(diff*800)
			}, "fast", function() {
				while (cpt < diff) {
					$("#rail img:last-child").after(first);
					first = $("img:first");
					$(this).css("margin-left", "+=800px");
					cpt++;
				}
				removeTitle();
				displayTitle();
			});
		} else if (diff < 0) {
			diff = diff * (-1);
			removeTitle();
			while (cpt < diff) {
				$("#rail img:first-child").before(last);
				last = $("img:last");
				$("#rail").css("margin-left", "-=800px");
				cpt++;
			}
			$("#rail").animate({
				marginLeft: "+="+(diff*800)
			}, "slow", function() {
				displayTitle();
			});
		}
		console.log("diff:"+diff);
		console.log(img);
		console.log(img.attr('data-nb'));

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

	$("#previous").click(showPrev);

	$("#slideshow").hover(function() {	// Mouse enters
		if (!canPlay && watchHover) {
			clearInterval(play);
		}
	}, function() {						// Mouse leaves
		if (!canPlay && watchHover) {
			play = setInterval(showNext, 2000);
		} else if (!canPlay && !watchHover) {
			watchHover = true;
		}
	});

	$('body').on('click', '[data-nbnav]', function() {
		var bullet = $(this);
		goTo(bullet.attr('data-nbnav'));
		/*if (bullet.attr('data-nbnav') > first.attr('data-nb')) {	
			//nextImg = showNext();
			repeatNext = setInterval(function() {
				nextImg = showNext();
				if (bullet.attr('data-nbnav') == (nextImg)) {
					clearInterval(repeatNext);
				}
				//console.log("bullet: "+bullet.attr('data-nbnav')+" ; nextimg: "+nextImg);
			}, 1000);
		} else if (bullet.attr('data-nbnav') < first.attr('data-nb')) {
			var repeatPrev = setInterval(function() {
				prevImg = showPrev();
				if (bullet.attr('data-nbnav') == prevImg)
					clearInterval(repeatPrev);
			}, 1000);
		}
		console.log("bullet : "+bullet.attr('data-nbnav'));*/
		
	});

});