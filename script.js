const questions = [
    {
        question: "8 dikali 10?",
        answers: [
            { text: "8O", correct: false},
            { text: "80", correct: true},
        ]
    },
    {
        question: "Menurut lo, apa yang terjadi saat manusia kelaparan?",
        answers: [
            { text: "Setiap organ tubuh akan menurun hingga 50% dari sebelumnya", correct: true},
            { text: "Tubuh jadi semangat melakukan aktivitas", correct: false},
        ]
    },
    {
        question: "Pertanyaan inti, sudah makan?",
        answers: [
            { text: "Sudah dong", correct: true},
            { text: "Belum nih", correct: false},
        ]
    },
    {
        question: "Kapan-kapan kalau lo belum makan, kita makan bareng yuk?",
        answers: [
            { text: "GAASSSS", correct: true},
            { text: "AYOOOOK", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Pinterrr!!! karena lo udah jawab ayo tentuin mau makan dimana dan kapan.`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


