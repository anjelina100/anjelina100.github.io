// event listeners

document.querySelector("#guessBtn").addEventListener("click", guess)

// Global variables
//generates random number between 1 and 99
let randomNumber = Math.floor(Math.random() * 99) + 1;
let count = 0;

function guess() {

    let userGuess = document.querySelector("#userGuess").value;

    // "value" is ONLY for input elements
    // document.querySelector("#userGuesses").textContent += userGuess + " ";

    document.querySelector("#userGuesses").textContent += ` ${userGuess} `;

    document.querySelector("#userGuesses").style.color = "red";
    document.querySelector("#userGuesses").style.backgroundColor = "yellow";

     if (userGuess > randomNumber) {
        count+= 1;
        document.querySelector("#message").textContent = ` ${"Too high!"} `;
    } else if (userGuess < randomNumber) {
        count+= 1;
        document.querySelector("#message").textContent = ` ${"Too low!"} `;
    } else {
        count+= 1;
        if(count < 7) {
            message.textContent= "You got it!";
        }
        document.querySelector("#message").textContent = ` ${"Correct! You guessed the number!"} `;
    }


    document.querySelector("#userGuess").value = "";

    if (count == 7) {
        if (userGuess == randomNumber) {
            count+= 1;
            message.textContent= "Correct!";
            message.style.color = "green";
        } else {
            count+= 1;
            message.textContent= "Incorrect!";
            message.style.color = "red";       
        }
        
        }

}