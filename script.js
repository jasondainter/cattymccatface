"use strict";

/**********************************************************/
/* SECRET WORD ARRAY STORAGE */
/**********************************************************/

// All the secret words: Try Limit to 8 chars max (not sure if it breaks after!)
const secretWordList = [
  "CARL",
  "GIZMO",
  "HARMONY",
  "HARRY",
  "JEFF",
  "JOHN",
  "LUTHOR",
  "STEVE",
];

/**********************************************************/
/* CREATE JAVASCRIPT OBJECT */
/**********************************************************/
const secretWord = {
  name: secretWordList[Math.trunc(Math.random() * secretWordList.length)],

  totalLetters: function () {
    return this.name.length;
  },
  firstLetter: function () {
    return this.name[0];
  },
  imageName: function () {
    return this.name + ".webp";
  },
  soundName: function () {
    return this.name + ".mp3";
  },
  imageAltText: function () {
    return "An image of a " + this.name;
  },
};

/**********************************************************/
/* CONSOLE LOGS (TURNED OFF) */
/**********************************************************/

// console.log(secretWord);
// console.log(secretWord.totalLetters()); // This will output the total number of letters in the "name"
// console.log(secretWord.firstLetter()); // This will output the total number of letters in the "name"
// console.log(secretWord.imageName()); // This will output the total number of letters in the "name"
// console.log(secretWord.imageAltText()); // This will output the total number of letters in the "name"
// console.log(
//   (document.querySelector(".image").src = "img/" + secretWord.imageName())
// );
console.log(secretWord.soundName());

// set the caret/text cursor to the first input box. Turned off as was causing UX issues
// document.querySelector(".box1").focus();

/**********************************************************/
/* FOR LOOP POPULATING THE INPUT BOXES / IMAGE WITH CURRENT SECRET
/**********************************************************/

for (let i = 0; i < secretWord.totalLetters() - 1; i++) {
  // Console log the letters in the secret word
  console.log(secretWord.name[i]);

  // loop through adding all the letters to the input boxes skipping the first letter
  document.querySelector(".box" + (i + 2)).value = secretWord.name[i + 1];
}

// Add the image to the page
document.querySelector(".image").src = "img/" + secretWord.imageName();
document.querySelector(".image").alt = secretWord.imageAltText();

// loop thorugh the input boxes and remove or add boxes depending on the length of the secret word
for (
  let i = 0;
  i < document.querySelectorAll(".letter-boxes .guessbox").length;
  i++
) {
  if (i > secretWord.totalLetters() - 1) {
    document.querySelector(".box" + (i + 1)).style.display = "none";
  }
}

/**********************************************************/
/* WIN OR LOSE LOGIC */
/**********************************************************/

document.querySelector(".check").addEventListener("click", function () {
  const guess = document.querySelector(".box1").value.toUpperCase();

  // compare it to the first letter of the secret word. If correct then make the background colour pink, if not then make the background colour red.

  /**********************************************************/
  /* WINNER */
  /**********************************************************/

  if (guess === secretWord.firstLetter()) {
    document.querySelector("body").style.backgroundColor = "#60b347"; // Change background

    // swap the button text to refresh text
    document.querySelector(".check").textContent = "Again?";

    // swap the h1 text to winning text and shrink a little
    document.querySelector(".title").textContent = "Purrrfect!";
    document.querySelector(".title").style.fontSize = "2.5rem";

    // disable the first input box
    document.querySelector(".box1").disabled = true;

    // Make the input boxes all have a pink gradient background and whie text
    for (
      let i = 0;
      i < document.querySelectorAll(".letter-boxes .guessbox").length;
      i++
    ) {
      document.querySelector(".box" + (i + 1)).style.background =
        // create a linear gradient background that has a random rotation for every pass of the loop
        "linear-gradient(" +
        Math.trunc(Math.random() * 360) +
        "deg, #e84f44, #e55099)";
      // Set the text colour on the box to white
      document.querySelector(".box" + (i + 1)).style.color = "#f7f7f7";
    }

    // make it rain confetti
    document.querySelector(".confettis").style.display = "block";

    // create another eventlistener on click for the again button to reset everything back to normal
    document.querySelector(".check").addEventListener("click", function () {
      // TODO you could create a high score here but this simple reload wouldnt work if so
      location.reload();
    });

    /**********************************************************/
    /* LOSER */
    /**********************************************************/
  } else {
    document.querySelector("body").style.backgroundColor = "#d30038"; // Change background

    // swap the button text to refresh text
    document.querySelector(".check").textContent = "Again?";

    // swap the h1 text to losing text and shrink a little
    document.querySelector(".title").textContent =
      "Wrong! Castastrophe! Try again!";
    document.querySelector(".title").style.fontSize = "2rem";

    // disable the first input box
    document.querySelector(".box1").disabled = true;

    // populate the first input box with the correct letter
    document.querySelector(".box1").value = secretWord.firstLetter();

    // make the background of the first input (with correct answer) darker pink
    document.querySelector(".box1").style.background = "#f7f7f7";

    // make the text of the first input (with correct answer) black
    document.querySelector(".box1").style.color = "#222";

    // create another eventlistener on click for the again button to reset everything back to normal
    document.querySelector(".check").addEventListener("click", function () {
      // TODO you could create a high score here but this simple reload wouldnt work if so
      location.reload();
    });
  }
});

/**********************************************************/
/* UX Improvements */
/**********************************************************/

// Disable typing in the input boxes except for the first one

for (
  let i = 0;
  i < document.querySelectorAll(".letter-boxes .guessbox").length;
  i++
) {
  if (i > 0) {
    document.querySelector(".box" + (i + 1)).disabled = true;
  }
}

// Add an event listener for the check button to always press the button if enter/return is pressed on a keyboard or on a mobile keyboard

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.querySelector(".check").click();
  }
});

/**********************************************************/
/* ON CLICK SOUNDS */
/**********************************************************/

// Add a sound that gets played automatically when the user clicks the image

const audio = new Audio("sounds/" + secretWord.soundName());

// create a new const audio from the current secretWord soundName property

// console.log((audio = new Audio("sounds/" + secretWordList.soundName())));

let playingSound = false;

document.querySelector(".image").addEventListener("click", function () {
  // when clicking this button don't deselect the current text input box. turned off as was weird on mobile
  // document.querySelector(".box1").focus();

  if (playingSound) {
    audio.pause();
    audio.currentTime = 0;
    playingSound = false;
  } else {
    audio.play();
    playingSound = true;
  }
});
