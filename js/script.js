$(document).ready(function() {

	/* Paramètres modifiables : */
	var speed = 800;
	var duration = 2000;

	/* Initialisation des variables : */
	var canClick = true;
	var play;
	var canPlay = true;
	var watchHover = false;

	/* Récupère les images : */
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

	/* Slide jusqu'à l'image suivante : */
	function showNext(){
		var first = $("img:first");		
		$('.navigator').css({
				display: "none"
			});
		$('.info').css({
				textShadow: "0 0 #fff"
			});
		if (canClick) {
			removeTitle();
			canClick = false;
			$("#rail").animate({
				marginLeft: "-=800"
			}, speed, function() {
				$("#rail img:last-child").after(first);
				$(this).css("margin-left", "+=800px");
				canClick = true;
				displayTitle();
			});
		}
		return first.attr('data-nb');
	}

	/* Slide jusqu'à l'image précédente : */
	function showPrev() {
		var first = $("img:first");	
		$('.navigator').css({
				display: "none"
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
			}, speed, function() {
				canClick = true;
				displayTitle();
			});
		}
		return first.attr('data-nb');
	}

	/* Afficher titre et description : */
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
				display: "block"
			});
		});
	}

	/* Faire disparaître titre et description : */
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
				display: "none"
			});
		});
	}

	/* Navigue vers la "bullet" cliquée : */
	function goTo(bullet) {
		var img = $("[data-nb="+bullet+"]");
		var first = $("img:first");
		var last = $("img:last");
		var diff = img.attr('data-nb') - first.attr('data-nb');
		var cpt = 0;

		if (diff > 0) {
			removeTitle();
			$("#rail").animate({
				marginLeft: "-="+(diff*800)
			}, speed, function() {
				while (cpt < diff) {
					$("#rail img:last-child").after(first);
					first = $("img:first");
					$(this).css("margin-left", "+=800px");
					cpt++;
				}
				displayTitle();
				canClick = true;
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
			}, speed, function() {
				displayTitle();
				canClick = true;
			});
		}
	}

	/* Switch entre Play / Pause (pour animation auto) : */
	function play() {
		if(canPlay == true){
			play = setInterval(showNext, duration);
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
	}

	play();

	$("#play").click(function(){
		if(canPlay == true){
			play = setInterval(showNext, duration);
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

	/* Left / right : */
	$("#next").click(showNext);

	$("#previous").click(showPrev);

	$('html').keydown(function(e) {
		if (e.which == 37)
			showPrev();
		if (e.which == 39) 
			showNext();
	});

	/* Met en pause l'animation auto au survol de la souris : */
	$("#slideshow, .info, .navigator").hover(function() {	// Souris entre
		if (!canPlay && watchHover) {
			clearInterval(play);
		}
	}, function() {											// Souris sort
		if (!canPlay && watchHover) {
			play = setInterval(showNext, duration);
		} else if (!canPlay && !watchHover) {
			watchHover = true;
		}
	});

	/* Clic sur les "bullets" : */
	$('body').on('click', '[data-nbnav]', function() {
		var bullet = $(this);
		canClick = false;
		goTo(bullet.attr('data-nbnav'));
	});

});