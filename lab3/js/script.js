// event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

shuffleQ1Choices();
function shuffleQ1Choices() {

    let q1Choices = ["font-color", "color", "text-size", "fontColor"];
    q1Choices=_.shuffle(q1Choices);

    for (let i of q1Choices) {
    let radioElement = document.createElement("input");
    radioElement.type = "radio";
    radioElement.name = "q1";
    radioElement.value = i;

    let labelElement = document.createElement("label");
    labelElement.textContent = i;

    labelElement.prepend(radioElement);

    document.querySelector("#q1ChoicesDiv").append(labelElement);
    }
}

let timesTaken = localStorage.getItem("quizCount") || 0;
document.querySelector("#timesTaken").textContent = "Times taken: " + timesTaken;

function gradeQuiz () {
    let score = 0;
    // radio
    let q1Selected = document.querySelector("input[name=q1]:checked");
    let userAnswer1;
    if (q1Selected) {
        userAnswer1 = q1Selected.value;
    } else {
        userAnswer1 = "";
    }


    if (userAnswer1 == "color") {
        score += 20;
        document.querySelector("#q1Feedback").innerHTML = '<img src = "checkmark.png"> Correct!';
    } else {
        document.querySelector("#q1Feedback").innerHTML = '<img src = "xmark.png"> Incorrect!';
    }
    //text input
    let userAnswer2 = document.querySelector("#q2").value.trim().toLowerCase(); 
    if (userAnswer2 == "background-color") { 
        score += 20;
        document.querySelector("#q2Feedback").innerHTML = '<img src="checkmark.png"> Correct!';
    } else {
        document.querySelector("#q2Feedback").innerHTML = '<img src = "xmark.png"> Incorrect!';
    }
    //checkbox
    let isCorrect3 = document.querySelector("input[name=q3][value='querySelector']").checked &&
    document.querySelector("input[name=q3][value='innerHTML']").checked &&
    document.querySelector("input[name=q3][value='function']").checked &&
    !document.querySelector("input[name=q3][value='attached']").checked;
    if (isCorrect3) {
        score += 20;
        document.querySelector("#q3Feedback").innerHTML = '<img src="checkmark.png"> Correct!';
    } else {
        document.querySelector("#q3Feedback").innerHTML = '<img src="xmark.png"> Incorrect!';
    }

    //dropdown
    let userAnswer4 = document.querySelector("#q4").value;
    if (userAnswer4 == "blue") {
        score += 20;
        document.querySelector("#q4Feedback").innerHTML = '<img src="checkmark.png"> Correct!';
    } else {
        document.querySelector("#q4Feedback").innerHTML = '<img src="xmark.png"> Incorrect!';
    }

    // number 
    let userAnswer5 = document.querySelector("#q5").value;
    if (userAnswer5 == 20) {
        score += 20;
        document.querySelector("#q5Feedback").innerHTML = '<img src="checkmark.png"> Correct!';
    } else {
        document.querySelector("#q5Feedback").innerHTML = '<img src="xmark.png"> Incorrect!';
    }


    document.querySelector("#score").textContent = "Your score: " + score + " / 100";
    if (score > 80) {
        document.querySelector("#congrats").textContent = "Congrats, you scored above 80!";
    }
timesTaken++;
localStorage.setItem("quizCount", timesTaken);
document.querySelector("#timesTaken").textContent = "Times quiz taken: " + timesTaken;
}

