var guessCount = 0;
//var guessesArray = [];
var victory = false; 
//var offset = NaN;
var answer;

$(document).ready(function(){
  	newGame();
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$("a.new").click(function() {
  		newGame();
  	});

  	$("input#userGuess").keydown(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			verifyGuess();
		}
  	});

  	$("input#guessButton").click(function(event) {
		event.preventDefault();
  		verifyGuess();
  	});

});

function newGame() {
	$("h2#feedback").text("Make your Guess!");
	guessCount = 0;
	$("span#count").text(guessCount);
	$('#guessList').empty();
	victory = false;
	generateAnswer();
}

function generateAnswer() {
	answer = Math.floor((Math.random() * 100) + 1);
}

function verifyGuess() {
	var guess = $("input#userGuess").val();

	$("input#userGuess").val("");

	if (victory) {
		$("h2#feedback").text("You've won - click NEW GAME!");
		return;
	}

	if (isNaN(guess)) {
		if (!(!isNaN(parseFloat(n)) && isFinite(n))) {
			$("h2#feedback").text("Enter a valid number.");
			return;
		}
	}


	else if (guess < 1 || guess > 100) {
		$("h2#feedback").text("Guess between 1 and 100 (inclusive).");
		return;
	}

	guess = parseInt(guess);

	var offset = Math.abs(answer - guess);

	if (offset === 0) {
		$("h2#feedback").text("You guessed correctly!");
		victory = true;
	} 
	else if (offset >= 1 && offset < 10) {
		$("h2#feedback").text("Your guess is scorching hot!");
	} 
	else if (offset >= 10 && offset < 20) {
		$("h2#feedback").text("Your guess is hot!");
	}
	else if (offset >= 20 && offset < 30) {
		$("h2#feedback").text("Your guess is warm.");
	}
	else if (offset >= 30 && offset < 50) {
		$("h2#feedback").text("Your guess is cold.");
	}
	else {
		$("h2#feedback").text("Your guess is ice cold!");
	}


/* // attempt at preventing duplicate guesses
	$("li").each(function() {
		if ($(this).text() === guess) {
			console.log("duplicate guess");
			return;
		}
	});
*/

	$("span#count").text(++guessCount);
	$("ul#guessList").append('<li>' + guess + '</li>');
}