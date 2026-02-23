let artPics = document.getElementById("artPics");
let response = document.getElementById("response");
let scoreNum = document.getElementById("scoreNum");
let home = document.getElementById("home");
let gameOver = document.getElementById("gameOver");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let nextBtn = document.getElementById("nextBtn");
//event listeners
btn1.addEventListener("click", function() { checkAnswer(btn1); });
btn2.addEventListener("click", function() { checkAnswer(btn2); });
btn3.addEventListener("click", function() { checkAnswer(btn3); });
document.getElementById("restartBtn").addEventListener("click", restartGame);
nextBtn.addEventListener("click", goToNext);


let questions = [ { image: "https://drawpaintacademy.com/wp-content/uploads/2017/11/15.-Claude-Monet-Water-Lilies-1905.jpg", correct: "Claude Monet", wrong: ["Vincent Van Gogh", "Pablo Picasso"] },
{
     image: "https://sanctuarymentalhealth.org/wp-content/uploads/2021/03/The-Starry-Night-1200x630-1-979x514.jpg.webp", correct: "Vincent Van Gogh", wrong:["Claude Monet", "Salvador Dalí"]
}, 
{
    image: "https://cdn.britannica.com/10/182610-050-77811599/The-Persistence-of-Memory-canvas-collection-Salvador-1931.jpg", correct: "Salvador Dalí", wrong:["Frida Kahlo", "Leonardo da Vinci"]
},
{
    image: "https://d1hhug17qm51in.cloudfront.net/www-media/2025/12/07130010/36.6061_01_B02-Artsy-JPEG_4000-pixels-long-1619x2048.jpg", correct: "Frida Kahlo", wrong:["Vincent van Gogh", "Pablo Picasso"]
},
{
    image: "https://www.pablopicasso.org/assets/img/paintings/dove.jpg", correct: "Pablo Picasso", wrong:["Salvador Dalí", "Leonardo da Vinci"]
}];

let currentQuestion = 0;
let score = 0;
loadQuestion(currentQuestion);

function loadQuestion(index) {
    let q = questions[index];
    artPics.src = q.image;
    let randomNum = Math.floor(Math.random() * 3);

    if (randomNum === 0) {
        btn1.textContent = q.correct;
        btn2.textContent = q.wrong[0];
        btn3.textContent = q.wrong[1];
    } else if (randomNum === 1) {
        btn1.textContent = q.wrong[0];
        btn2.textContent = q.correct;
        btn3.textContent = q.wrong[1];
    } else {
        btn1.textContent = q.wrong[0];
        btn2.textContent = q.wrong[1];
        btn3.textContent = q.correct;
    }
    
    btn1.style.backgroundColor = "";
    btn2.style.backgroundColor = "";
    btn3.style.backgroundColor = "";
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    nextBtn.disabled = true;
    response.textContent = "";
    document.getElementById("questionCounter").textContent = "Question " + (index+1) + " of " + questions.length
}

function checkAnswer(clickedButton) {
    let correctArtist = questions[currentQuestion].correct;
    if(clickedButton.textContent === correctArtist) {
        clickedButton.style.backgroundColor = "green";
        response.textContent = "Correct!";
        score+=1;
        scoreNum.textContent = score;
    } else {
        clickedButton.style.backgroundColor = "red";
        response.textContent = "Wrong!";
    }
    btn1.disabled = true;
    btn2.disabled = true;
    btn3.disabled = true;
    nextBtn.disabled = false;
}
function restartGame() {
    currentQuestion = 0;
    score = 0;
    scoreNum.textContent = 0;
    home.style.display = "block";
    gameOver.style.display = "none";
    loadQuestion(0);
}
function goToNext() {
    currentQuestion+=1;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        home.style.display = "none";
        gameOver.style.display = "block";
        document.getElementById("finalScore").textContent = score;
    }
}