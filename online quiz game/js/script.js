document.addEventListener("DOMContentLoaded", function () { 
    const progressListItems =  
        document.querySelectorAll("#progressbar li"); 
    const progressBar = 
        document.querySelector(".progress-bar"); 
    let currentStep = 0; 
  
    function updateProgress() { 
        const percent =  
            (currentStep / (progressListItems.length - 1)) * 100; 
        progressBar.style.width = percent + "%"; 
  
        progressListItems.forEach((item, index) => { 
            if (index === currentStep) { 
                item.classList.add("active"); 
            } else { 
                item.classList.remove("active"); 
            } 
        }); 
    } 
  
  
    function showStep(stepIndex) { 
        const steps = 
            document.querySelectorAll(".display-container"); 
        steps.forEach((step, index) => { 
            if (index === stepIndex) { 
                step.style.display = "block"; 
            } else { 
                step.style.display = "none"; 
            } 
        }); 
    } 
    function nextStep() { 
        if (currentStep < progressListItems.length - 1) { 
            currentStep++; 
            showStep(currentStep); 
            updateProgress(); 
        } 
       
    } 
   
  
    const nextStepButtons =  
        document.querySelectorAll("#next-button"); 
        const restartStepButtons =  
        document.querySelectorAll("#restart"); 
  
    nextStepButtons.forEach((button) => { 
        button.addEventListener("click", nextStep); 
    }); 
    restartStepButtons.forEach((button) => { 
        button.addEventListener("click", restartStep); 
    }); 
    
});
function refreshPage(){
    window.location.reload();
} 
//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["A) a","B) link","C) href","D) hyperlink"],
        correct: "A) a",
    },
    {
        id: "1",
        question: "What does the footer tag in HTML represent?",
        options: ["A) The bottom section of a document or a section","B) A footnote","C) A sidebar","D) A navigation menu"],
        correct: "A) The bottom section of a document or a section",
    },
    {
        id: "2",
        question: "Which attribute is used to specify a unique identifier for an HTML element?",
        options: ["A) class","B) id","C) name","D) style"],
        correct: "B) id",
    },
    {
        id: "3",
        question: "Which CSS selector is used to select elements with a specific class?",
        options: ["A) #classname","B) .classname","C) classname","D) *classname"],
        correct: "B) .classname",
    },
    {
        id: "4",
        question: "Which CSS property is used to change the text color of an element?",
        options: ["A) font-color","B) text-color","C) color","D) text-style"],
        correct: "C) color",
    },
    {
        id: "5",
        question: "In the CSS box model, which property is used to set the space outside the border of an element?",
        options: ["A) padding","B) margin","C) border","D) outline"],
        correct: "B) margin",
    }, {
        id: "6",
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["A) var","B) int","C) string","D) let"],
        correct: "A) var",
    },
    {
        id: "7",
        question: "How do you call a function named myFunction in JavaScript?",
        options: ["A) call myFunction()","B) myFunction()","C) call function myFunction()","D) execute myFunction()"],
        correct: "B) myFunction()",
    },
    {
        id: "8",
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["A) onmouseover","B) onchange","C) onclick","D) onmouseclick"],
        correct: "C) onclick",
    },
    {
        id: "9",
        question: "What feature in Figma allows multiple team members to work on the same design file simultaneously?",
        options: ["A) Version history","B) Commenting","C) Real-time collaboration","D) Prototyping"],
        correct: "C) Real-time collaboration",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};