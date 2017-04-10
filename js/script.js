var canClick = true;


	$("#next").click(function() {
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
	});

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
	