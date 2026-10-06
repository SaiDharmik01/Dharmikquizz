const questions = [
    {
        question: "Who has scored the most runs in international cricket?",
        options: ["Virat Kohli", "Sachin Tendulkar", "Ricky Ponting", "Brian Lara"],
        answer: "Sachin Tendulkar"
    },
    {
        question: "How many players are there in a cricket team?",
        options: ["9", "10", "11", "12"],
        answer: "11"
    },
    {
        question: "Which country won the 2011 Cricket World Cup?",
        options: ["Australia", "India", "Sri Lanka", "England"],
        answer: "India"
    },
    {
        question: "How many overs are there in a T20 innings?",
        options: ["10", "15", "20", "25"],
        answer: "20"
    },
    {
        question: "Who is known as the 'God of Cricket'?",
        options: ["MS Dhoni", "Virat Kohli", "Sachin Tendulkar", "Rohit Sharma"],
        answer: "Sachin Tendulkar"
    },
    {
        question: "Which team is known as the Men in Blue?",
        options: ["Australia", "India", "England", "South Africa"],
        answer: "India"
    },
    {
        question: "How many stumps are there at one end of a cricket pitch?",
        options: ["2", "3", "4", "6"],
        answer: "3"
    },
    {
        question: "Who is famous for the helicopter shot?",
        options: ["Rohit Sharma", "MS Dhoni", "AB de Villiers", "Yuvraj Singh"],
        answer: "MS Dhoni"
    },
    {
        question: "Which format of cricket has 50 overs per side?",
        options: ["Test", "T20", "ODI", "The Hundred"],
        answer: "ODI"
    },
    {
        question: "What is a score of 100 runs by a batsman called?",
        options: ["Half-century", "Century", "Double", "Ton-up"],
        answer: "Century"
    }
];

let currentQuestion = 0;
let score = 0;
let selected = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const progressElement = document.getElementById("progress");

const authPage = document.getElementById("authPage");
const quizPage = document.getElementById("quizPage");


// ====================
// REGISTER
// ====================

function register() {

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    localStorage.setItem("quizUser", JSON.stringify({
        name: name,
        email: email,
        password: password
    }));

    alert("Account created successfully!");

    showLogin();
}


// ====================
// LOGIN
// ====================

function login() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("quizUser"));

    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        authPage.classList.add("hidden");
        quizPage.classList.remove("hidden");

        currentQuestion = 0;
        score = 0;

        showQuestion();

    } else {
        alert("Incorrect email or password.");
    }
}


// ====================
// SHOW REGISTER
// ====================

function showRegister() {

    document.getElementById("loginForm").classList.add("hidden");

    document.getElementById("registerForm").classList.remove("hidden");
}


// ====================
// SHOW LOGIN
// ====================

function showLogin() {

    document.getElementById("registerForm").classList.add("hidden");

    document.getElementById("loginForm").classList.remove("hidden");
}


// ====================
// LOGOUT
// ====================

function logout() {

    quizPage.classList.add("hidden");

    authPage.classList.remove("hidden");

    currentQuestion = 0;
    score = 0;
}


// ====================
// SHOW QUESTION
// ====================

function showQuestion() {

    selected = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    optionsElement.innerHTML = "";

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option");

        button.onclick = function () {

            if (!selected) {
                checkAnswer(option, button);
            }

        };

        optionsElement.appendChild(button);

    });
}


// ====================
// CHECK ANSWER
// ====================

function checkAnswer(selectedAnswer, selectedButton) {

    selected = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {

        score++;

        selectedButton.style.background = "#22c55e";
        selectedButton.style.color = "white";

        alert("Correct!");

    } else {

        selectedButton.style.background = "#ef4444";
        selectedButton.style.color = "white";

        alert("Wrong!");

        // Show correct answer
        allOptions.forEach(button => {

            if (button.textContent === correctAnswer) {
                button.style.background = "#22c55e";
                button.style.color = "white";
            }

        });

    }
}


// ====================
// NEXT BUTTON
// ====================

nextButton.onclick = function () {

    if (!selected) {

        alert("Please select an answer first.");

        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } 

        else {

    const percentage = Math.round((score / questions.length) * 100);
    const wrongAnswers = questions.length - score;

    document.getElementById("finalScore").textContent =
        score + "/" + questions.length;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("correctCount").textContent =
        score;

    document.getElementById("wrongCount").textContent =
        wrongAnswers;

    let message = "";

if (score === 10) {
    message = "🏆 WELL DONE, DHARMIK! PERFECT SCORE!";
} else if (score >= 8) {
    message = "🔥 WELL DONE, DHARMIK! EXCELLENT PERFORMANCE!";
} else if (score >= 6) {
    message = "👏 GREAT JOB, DHARMIK! YOU'RE DOING WELL!";
} else if (score >= 4) {
    message = "👍 GOOD EFFORT, DHARMIK! KEEP PRACTICING!";
} else {
    message = "🏏 KEEP GOING, DHARMIK! COME BACK STRONGER!";
}

    document.getElementById("resultMessage").textContent =
        message;

    quizPage.classList.add("hidden");
    resultsPage.classList.remove("hidden");
}
    };
