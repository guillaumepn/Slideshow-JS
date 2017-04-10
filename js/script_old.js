var prenom = "guillaume";

/*alert("affichage d'une popup");

var bool = confirm("supprimer ?");*/

var nb;
var premier = true;
var i = 2;

do {
	nb = prompt("entrer un chiffre entier positif : ");

	if (isNaN(nb))
		alert("not a number");

	if (nb && nb < 2)
		alert(nb + " n'est pas un nombre premier");

	if (nb === "")
		alert("pas de chaine vide plz");

	if (nb && !isNaN(nb) && !Number.isInteger(parseFloat(nb)))
		alert("pas de float");

} while(nb < 2 || isNaN(nb) || nb === "" || !Number.isInteger(parseFloat(nb)));

for ( ; i <= Math.sqrt(nb) ; i++) {
	if (!(nb%i)) {
		premier = false;
		break;
	}
}

if (premier)
	alert("premier");
else
	alert("pas premier");




$("button:eq(0)").click(function() {
	$("p").hide();
});

$("button:eq(1)").click(function() {
	$("p").show();
});

$("button:eq(2)").click(function() {
	// $("p").toggle();
	if ($("p").is(":visible"))
		$("p").hide();
	else
		$("p").show();
});

