const quizData = [
    {
        question: 'Hoa nào mà em thíck ?',
        a: '🌹🌹🌹🌹',
        b: '🌻🌻🌻🌻',
        c: '🌼🌼🌼🌼',
        d: '🌷🌷🌷🌷',
        correct: 'd'
    },
    {
        question: '"Ăn" cái nào bây giờ ??',
        a: '🍰 (cake)',
        b: '🥤 (bubble tea)',
        c: '🧃 (strawberry milk)',
        d: '🍭 (candy)',
        correct: 'b'
    },
    {
        question: 'How much do you love me ❤️',
        a: 'Khum bít',
        b: 'Mụt chút (-_-)',
        c: 'Ko thể đong đếm (đáp án chính xác)',
        d: 'Ko thể nói',
        correct: 'c'
    }
];


const quiz = document.getElementById("quiz-container");
const quiz_count = document.getElementById("quiz-count");

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const radioButtons = document.querySelectorAll("input[name='answer']");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.getElementById("submit");
const previousBtn = document.getElementById("previous");

let currentQuiz = 0;
let score = 0;

const quizDataChosen = [];

loadQuiz();

function loadQuiz() {
    quiz_count.innerText = `${currentQuiz + 1}/${quizData.length}`

    questionEl.innerText = quizData[currentQuiz].question;
    a_text.innerText = quizData[currentQuiz].a;
    b_text.innerText = quizData[currentQuiz].b;
    c_text.innerText = quizData[currentQuiz].c;
    d_text.innerText = quizData[currentQuiz].d;

    if ((currentQuiz + 1) === quizData.length) {
        document.querySelector("#submit").innerText = 'Submit';
    }
}

function getSelectedAnswer() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    });

    return answer;
}

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", () => {
        quizDataChosen[currentQuiz] = radioButton.id;
        console.log(radioButton.id);
        console.log(quizDataChosen);
    })
})

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;

        if (answerEl.id === quizDataChosen[currentQuiz]) {
            answerEl.checked = true;
        }
    });
}

submitBtn.addEventListener("click", () => {
    const answer = getSelectedAnswer();
    
    if (answer) {
        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
            deselectAnswers();
        } else {
            quizData.forEach((item, index) => {
                if (item.correct === quizDataChosen[index])
                    score++;
            });

            if (score === quizData.length) {
                quiz.innerHTML = `
                <div class="quiz-score">
                    <h2>🎉🎉 Điểm của bạn: ${score}/${quizData.length} 🎉🎉</h2>
                    <button onclick="location.reload()"> Quay lại </button>
                </div>
                `
            } else {
                quiz.innerHTML = `
                    <div class="quiz-score">
                        <h2>💣💣 Điểm của bạn: ${score}/${quizData.length}  💣💣</h2>
                    </div>
                    <button onclick="location.reload()"> Xem đáp án ko dc đâu làm lại thui >>></button>
                `
            }

        }
    } else {
        alert("Chọn đi");
    }
})

previousBtn.addEventListener("click", () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
        deselectAnswers();
    }
})

