let container = document.querySelector("#container");
let current_question = 1;
let total_correct_ans = 0;

window.onload = () => {
    quizRules();
}

let quizRules = () => {
    current_question = 1;
    total_correct_ans = 0;

    container.innerHTML = `
    <div class="header">QUIZ <br>INSTRUCTIONS</div>
        <ol></ol>
        <div id="start-quiz-wrapper">
            <button id="start-quiz">Start Quiz</button>
        </div>
    <p class="createdby"> -- Created By Sahil Lokhande --</p><br>
    `;

    ol = document.querySelector("ol");

    quiz_rules.forEach(rule => {
        ol.innerHTML += `<li>${rule}</li>`
    });

    start_quiz_btn = document.querySelector("#start-quiz");

    start_quiz_btn.addEventListener("click", () => {
        quizQuestion(current_question);
    });
}


let quizQuestion = (q) => {
    q--;
    container.innerHTML = `
    <div class="header">Questions</div>
        <div class="content">
            <div class="content-wrapper">
                <h2 class="question">${current_question + "." + quiz_questions[q]['question']}</h2>
                <div id="option-container">
                </div>
            </div>
            <div class="footer" id="footer">
                <p id="timer">Time Left: 10 Sec</p>
            </div>
        </div>
    `;

    let options_container = document.querySelector("#option-container");

    quiz_questions[q]['options'].forEach((option, index) => {
        options_container.innerHTML += `<p class="option">${option}</p>`
    });


    options = document.querySelectorAll(".option");

    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            clearInterval(interval);
            // adding next question button
            document.querySelector("#footer").innerHTML += `<button id="next-question">Submit Question</button>`;

            document.querySelector("#next-question").addEventListener("click", () => {
                if (current_question == quiz_questions.length) {
                    clearInterval(interval);
                    quizResult();
                    return;
                }
                current_question++;
                clearInterval(interval);
                quizQuestion(current_question);
            });


            // disable all options.
            options.forEach(disabled => {
                disabled.style.pointerEvents = "none";
            });

            // storing selected answers
            quiz_questions[q]['selected_answer'] = index + 1;
            console.log(quiz_questions);

            if ((index + 1) == quiz_questions[q]["answer"]) {
                option.classList.add("correct");
                total_correct_ans++;
                option.innerHTML += "<span>Correct</span>";
            } else {
                option.classList.add("wrong");
                option.innerHTML += "<span>Wrong</span>";
            }

        });
    });

    // creating timer
    // 20 seconds (default time)
    time_left = 10;
    interval = setInterval(() => {
        time_left--;
        if (time_left == 0) {
            clearInterval(interval);
            // disable all options.
            options.forEach(disabled => {
                disabled.style.pointerEvents = "none";
            });

            // adding next question button
            document.querySelector("#footer").innerHTML += `<button id="next-question">Try Next</button>`;

            document.querySelector("#next-question").addEventListener("click", () => {
                if (current_question == quiz_questions.length) {
                    clearInterval(interval);
                    quizResult();
                    return;
                }
                current_question++;
                quizQuestion(current_question);
            });
            document.querySelector("#timer").classList.add("time-over");
            document.querySelector("#timer").innerHTML = `Time Over`;
        }else{   
            document.querySelector("#timer").innerHTML = `Time Left: ${time_left} Sec`;
        }
    }, 1000);
}


let quizResult = () => {
    container.innerHTML = `
    <div class="header">Congratulations !!!</div>
        <div id="trophy">
            <i class="fa-solid fa-trophy"></i>
        </div>
        <h3 id="score">You Got <b>${total_correct_ans}</b> Out Of <b>${quiz_questions.length}</b></h3>
        <div id="result-footer">
            <button id="start-again">Start Again</button>
            
        </div>
    `;

    document.querySelector("#start-again").addEventListener("click",()=>{
        quizRules();
    });

    
   
}

