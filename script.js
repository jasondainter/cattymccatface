"use strict";

/**********************************************************/
/* LOAD EXTRA VOICES FOR TEXT TO SPEECH */
/**********************************************************/

let voices = [];

// Wait for the voices to be loaded before populating the `voices` array
window.speechSynthesis.onvoiceschanged = function () {
  voices = window.speechSynthesis.getVoices();
};

// Pre-load the sounds/PURR.mp3 file

// const audio = new Audio("sounds/PURR.mp3");

/**********************************************************/
/* SECRET WORD ARRAY STORAGE */
/**********************************************************/

// All the secret words: Try Limit to 8 chars max (not sure if it breaks after!)
const secretWordList = [
  "CHRIS",
  "GARETH",
  "HARMONY",
  "HARRY",
  "JEFF",
  "JOHN",
  "LUTHER",
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
// console.log(secretWord.soundName());

// set the caret/text cursor to the first input box. Turned off as was causing UX issues
// document.querySelector(".box1").focus();

/**********************************************************/
/* FOR LOOP POPULATING THE INPUT BOXES / IMAGE WITH CURRENT SECRET
/**********************************************************/

for (let i = 0; i < secretWord.totalLetters() - 1; i++) {
  // Console log the letters in the secret word

  // loop through adding all the letters to the input boxes skipping the first letter
  document.querySelector(".box" + (i + 2)).value = secretWord.name[i + 1];
}

// Add the image to the page
document.querySelector(".image").src = "img/cats/" + secretWord.imageName();
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

    // // play the winning sound PURR.mp3
    const audio = new Audio("sounds/PURR.mp3");
    audio.play();

    // create another eventlistener on click for the again button to reset everything back to normal
    document.querySelector(".check").addEventListener("click", function () {
      // TODO you could create a high score here but this simple reload wouldnt work if so
      location.reload();
      // force the first input box to be selected and made empty
      document.querySelector(".box1").focus();
      document.querySelector(".box1").value = "";
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
      // force the first input box to be selected and made empty
      document.querySelector(".box1").focus();
      document.querySelector(".box1").value = "";
      location.reload();
    });
  }
});

/**********************************************************/
/* UX Improvements */
/**********************************************************/

// Add a javascript powered hover effect to the image

const img = document.querySelector("img");

img.addEventListener("mouseover", function () {
  img.style.transform = "scale(1.05)";
  img.style.transition = "all 0.2s";
});

img.addEventListener("mouseout", function () {
  img.style.transform = "scale(1)";
  img.style.transition = "all 0.2s";
});

// apply and remove the same hover effect when tapped on mobile (is removed later after sound finishes)

img.addEventListener("touchstart", function () {
  img.style.transform = "scale(1.05)";
  img.style.transition = "all 0.2s";
});

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

// add a Speech Synthesis text-to-speech sound that plaays the secret word when the user clicks the image

img.addEventListener("click", function () {
  const utterance = new SpeechSynthesisUtterance(secretWord.name);
  utterance.lang = "en-GB";
  utterance.rate = 0.8; // a little slower

  const ukVoice = "Google UK English Female";
  const voice = voices.find((voice) => voice.name === ukVoice);

  if (voice) {
    utterance.voice = voice;
  } else {
    console.log("Voice not found: " + ukVoice);
    // handle the case where the voice is not found
  }

  // console.log(voices);
  // console.log(ukVoice);
  // console.log(utterance);

  speechSynthesis.speak(utterance);
  // after the sound has finished playing, set playingSound to false and replicate the mouseout function to stop the image from being scaled up on mobile tap
  utterance.onend = function () {
    img.style.transform = "scale(1)";
    img.style.transition = "all 0.2s";
  };
});
