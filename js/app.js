// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza por A:", " ¿Qué estuvo haciendo Shlomó con las mujeres en este capítulo?", "AUMENTARLAS/Aumentar"),
	new Word(1, "B", "Contiene la B:", "  ¿Qué es lo que se reparte en este capítulo?", "tribus"),
	new Word(2, "C", "Empieza por C:", " ¿Que le rasgó Ajia a Jeroboam?", "capa"),
	new Word(3, "D", "Contiene la D:", " ¿Como se llama la región en donde David exterminó a todos los hombres?", "Edom"),
	new Word(4, "E", "Empieza por E:", " ¿A dónde huyó Jeroboam?", "Egipto"),
	new Word(5, "F", "Contiene la F:", " ¿Qué rol cumple la persona que habló con Jeroboam?", "Profeta"),
	new Word(6, "G", "Contiene la G:", " ¿Qué es lo que D”s le dijo a Shlomó que iba a hacer con su reino por no mantenerse en su camino?", "Rasgarlo"),
	new Word(7, "H", "Empieza por H:", " ¿Que era Rejavam de Shlomó?", "Hijo"),
	new Word(8, "I", "Contiene la I:", " ¿Cómo se llama el padre de Jedidias?", "David"),
	new Word(9, "J", "Contiene la J:", " ¿Cómo se llama el profeta que aparece en este capítulo?", "Ajia"),
	new Word(10, "K", "Empieza por K:", " ¿Cómo se llama uno de los ídolos de los moabitas?", "Kmosh"),
	new Word(11, "L", "Empieza por L:", " ¿Con qué objeto representa  D’’s  la promesa de descendencia de David, representando la continuidad de su dinastía?", "Lampara"),
	new Word(12, "M", "Empieza por M:", " ¿Que desobedeció Shlomo al momento de adorar otros dioses? ", "Mandamientos"),
	new Word(13, "N", "Contiene la N:", "  ¿Cuál es el nombre de uno de los enemigos de Shlomó de este capítulo?", "Rzon"),
	new Word(14, "O", "Contiene la O:", " ¿Que le hicieron a Shlomó en la ciudad de David al final de este capítulo?", "Enterrarlo"),
	new Word(15, "P", "Empieza por P:", " ¿Cómo se llamaba el gobernante de Egipto que dio casa y tierras a Hadad?.", "Paro"),
	new Word(16, "Q", "Empieza por Q:", " D’’s le ____ 10 de las 12 tribus al hijo de Shlomó.", "Quito"),
	new Word(17, "R", "Empieza por R:", " ¿Cómo se llama el hijo de Shlomo que le sucede en el trono?", "Rejavam"),
	new Word(18, "S", "Empieza por S:", " Cantidad de esposas que tuvo shlomó", "Setecientas"),
	new Word(19, "T", "Contiene la T:", " Nombrar el pueblo extranjero con el que Shlomó mantuvo relaciones que empieza con M", "Moavitas"),
	new Word(20, "U", "Contiene la U:", " ¿Que construyó Shlomó para sus esposas de otros reinos?", "Estatuas"),
	new Word(21, "V", "Contiene la V:", " ¿Qué son lo que D”s fue presentándole a Shlomó? ", "Adversarios"),
	new Word(22, "X", "Contiene la X:", " ¿Cómo eran las mujeres con las que se casó Shlomó? ", "Extranjeras"),
	new Word(23, "Y", "Contiene la Y:", " ¿Qué función cumplió el hijo de Shlomó tras morir éste?", "Rey"),
	new Word(24, "Z", "Contiene la Z:", " Cantidad de tribus que le dió Dios a Jeroboam", "Diez")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	var correctAnswers = words[pos].word.toLowerCase().split('/');

	if (correctAnswers.includes(userAnswer)) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");
	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}

	remainingWords--;
	$("#js--score").html(remainingWords);

	return count++;
}


function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
