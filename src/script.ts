/* ---------- QUESTIONS + ANSWERS ---------- */

// Definition of types for questions + answers
interface Question {
  question: string;
  answers_false: string[];
  answer_true: string;
}

let questions: Question[] = [
  {
    question: "Which programming language is often used for web development?",
    answers_false: ["Java", "C#", "Python"],
    answer_true: "JavaScript",
  },
  {
    question: "Which JS Framework does exist?",
    answers_false: ["Angulara JS", "Init JS", "Reacter JS"],
    answer_true: "Vue JS",
  },
  {
    question: "Which property is used to define the font style?",
    answers_false: ["font-family", "font-size", "font-weight"],
    answer_true: "font-style",
  },
  {
    question: "What does CSS stand for?",
    answers_false: [
      "Counter Strike: Source",
      "Computer Style Sheet",
      "Corrective Style Sheet",
    ],
    answer_true: "Cascading Style Sheet",
  },
  {
    question: "What does HTML stand for?",
    answers_false: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Home Text Marker Language",
    ],
    answer_true: "Hyper Text Markup Language",
  },
  {
    question: "What is the purpose of the 'git' version control system?",
    answers_false: ["Text editing", "Database management", "Graphic design"],
    answer_true: "Version control",
  },
  {
    question: "What is the correct HTML tag for the largest heading?",
    answers_false: ["<h6>", "<heading>", "<head>"],
    answer_true: "<h1>",
  },
  {
    question: "Which of these tags are table tags?",
    answers_false: ["<table><body><tr>", "<tbody><tt><tfoot>", "<td><tr><te>"],
    answer_true: "<table><thead><td>",
  },
  {
    question: "What is the correct tag for a numbered list?",
    answers_false: ["<ul>", "<ot>", "<orl>"],
    answer_true: "<ol>",
  },
  {
    question: "What is NOT a CSS position?",
    answers_false: ["<absolute>", "<relative>", "<fixed>"],
    answer_true: "<floated>",
  },
];

/* ---------- USER ANSWERS ---------- */

interface UserAnswer {
  question: string;
  answers: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

let userAnswers: UserAnswer[] = []; // Array to save user answers

/* ---------- GLOBAL VARIABLES ---------- */

// Add types for DOM-elements + variables
const main = document.getElementById("main") as HTMLElement;
const quizContainer = document.getElementById("quizContainer") as HTMLElement;
const questionSection = document.getElementById(
  "questionSection"
) as HTMLElement;
const answersSection = document.getElementById("answersSection") as HTMLElement;
const controlsSection = document.getElementById(
  "controlsSection"
) as HTMLElement;

let mixedQuestions: Question[] = []; // Array to save mixed questions
let currentQuestionIndex: number = 0; // Set initial index to 0
let currentQuestion: Question | undefined; // Variable for current question -> undefined, bc at first there is no question
let answers: string[] = []; // Array to save answers
let score: number = 0; // Set initial score to 0
let questionAnswered: boolean = false; // To check if question was already answered

/* ---------- HOME SCREEN ---------- */

// Quiz title
const quizTitle: HTMLHeadingElement = document.createElement("h1");
quizTitle.classList.add("quiz-title");
quizTitle.innerText = "Web Development Quiz";
questionSection.appendChild(quizTitle);

// Enter username
const userContainer: HTMLDivElement = document.createElement("div");
userContainer.classList.add("user-container");

// Input field + button for username
let usernameInput: HTMLInputElement = document.createElement("input");
usernameInput.classList.add("username-input");

const usernameSubmit: HTMLButtonElement = document.createElement("button");
usernameSubmit.classList.add("username-submit");
usernameSubmit.innerText = "Ok";
usernameSubmit.addEventListener("click", () => submitName(usernameInput));

userContainer.appendChild(usernameInput);
userContainer.appendChild(usernameSubmit);
questionSection.appendChild(userContainer);

// Start button
const startButton: HTMLButtonElement = document.createElement("button");
startButton.classList.add("start-button");
startButton.innerText = "Start quiz!";
startButton.addEventListener("click", () => startQuiz());
answersSection.appendChild(startButton);

/* ---------- SUBMIT NAME ---------- */

function submitName(usernameInput: HTMLInputElement): void {
  // Check if name was entered
  if (usernameInput.value === "") {
    alert("Please enter your name!");
    return;
  }

  usernameSubmit.disabled = true; // Disable submit button

  // Message for user
  const userName: HTMLParagraphElement = document.createElement("p");
  userName.classList.add("user-name");
  userName.innerText =
    "Hello " + usernameInput.value + "! " + "Let's start the quiz!";
  questionSection.appendChild(userName);
}

/* ---------- START QUIZ ---------- */

function startQuiz(): void {
  // Check if name was submitted
  if (usernameSubmit.disabled === false) {
    alert("Please submit your name!");
    return;
  }

  mixQuestions();
  displayQuestion();
  startButton.classList.add("hidden"); // Hide start button after quiz has started
}

/* ---------- MIX QUESTIONS ---------- */

function mixQuestions(): void {
  // Create 2 random numbers between 1 & 0 and substract them from each other -> to get positive or negative number als result; result is negative or 0 = order stays the same; result is positive = order is changes -> elements get mixed
  mixedQuestions = questions.sort(() => Math.random() - Math.random());
}

/* ---------- DISPLAY QUESTIONS ---------- */

function displayQuestion(): void {
  questionSection.innerHTML = ""; // Empty questions section
  controlsSection.innerHTML = ""; // Empty controls section
  questionAnswered = false; // Reset question status

  // Check if index is lower than total number of questions
  if (currentQuestionIndex < mixedQuestions.length) {
    currentQuestion = mixedQuestions[currentQuestionIndex];

    const questionText: HTMLHeadingElement = document.createElement("h2");
    questionText.classList.add("question");
    questionText.innerText = currentQuestion.question;
    questionSection.appendChild(questionText);

    // Save all answers in new array; ... = spread operator -> expands bzw. "zerpflückt" array into its elements
    answers = [...currentQuestion.answers_false, currentQuestion.answer_true];
    answers = answers.sort(() => Math.random() - Math.random()); // Mix answers the same way like questions above

    answersSection.innerHTML = ""; // Empty answers section

    // Create button for each answer + add to answers section
    answers.forEach((answer: string) => {
      const answerButton: HTMLButtonElement = document.createElement("button");
      answerButton.classList.add("answer-button");
      answerButton.innerText = answer;
      answerButton.addEventListener("click", () =>
        checkAnswer(answer, answerButton)
      );
      answersSection.appendChild(answerButton);
    });

    // Show progress
    const progress: HTMLParagraphElement = document.createElement("p");
    progress.classList.add("progress");
    progress.innerText = `Question ${currentQuestionIndex + 1} of ${
      mixedQuestions.length
    }`;
    controlsSection.appendChild(progress);

    // Button for next question
    const nextButton: HTMLButtonElement = document.createElement("button");
    nextButton.classList.add("next-button");
    nextButton.innerText = "Next question";
    nextButton.addEventListener("click", () => {
      // Check if question was answered
      if (questionAnswered === false) {
        alert("Please select an answer!");
        return;
      }
      displayQuestion(); // Display next question
    });

    controlsSection.appendChild(nextButton);
  } else {
    showResult();
  }
}

/* ---------- CHECK ANSWER ---------- */

function checkAnswer(answer: string, answerButton: HTMLButtonElement): void {
  // Check if question was already answered
  if (questionAnswered === true) {
    alert("You have already answered this question!");
    return;
  }

  currentQuestion = mixedQuestions[currentQuestionIndex]; // Set current question
  currentQuestionIndex++; // Increment question index
  questionAnswered = true; // Set question status as answered

  // Check if answer is true or false
  const correctAnswer = answer === currentQuestion.answer_true;
  if (correctAnswer) {
    answerButton.classList.add("correct");
    score += 1; // Add 1 point to score
  } else {
    answerButton.classList.add("incorrect");
  }

  // Save user answer to array
  userAnswers.push({
    question: currentQuestion.question,
    answers: [...currentQuestion.answers_false, currentQuestion.answer_true],
    correctAnswer: currentQuestion.answer_true,
    userAnswer: answer,
    isCorrect: correctAnswer,
  });
}

/* ---------- SHOW RESULT ---------- */

function showResult(): void {
  main.classList.remove("main-answers"); // Remove class to style main
  main.classList.add("main-questions"); // Add class to style main

  quizContainer.innerHTML = ""; // Empty container
  quizContainer.classList.remove("quiz-container-flex-left"); // Remove class to style container
  quizContainer.classList.add("quiz-container-flex-center"); // Add class to style container

  controlsSection.innerHTML = ""; // Empty controls section to remove "next"-button

  // Create elements for score + reset
  const scoreTitle: HTMLHeadingElement = document.createElement("h2");
  scoreTitle.classList.add("score-title");
  scoreTitle.innerText = "Your final score:";

  const scoreResult: HTMLHeadingElement = document.createElement("h2");
  scoreResult.classList.add("score-result");
  scoreResult.innerHTML = `${score} / <span>${questions.length}</span>`;

  const restartButton: HTMLButtonElement = document.createElement("button");
  restartButton.classList.add("restart-button");
  restartButton.innerText = "restart quiz";
  restartButton.addEventListener("click", () => location.reload());

  const showAnswersButton: HTMLButtonElement = document.createElement("button");
  showAnswersButton.classList.add("show-answers-button");
  showAnswersButton.innerText = "Check questions";
  showAnswersButton.addEventListener("click", showAllAnsweredQuestions);

  quizContainer.appendChild(scoreTitle);
  quizContainer.appendChild(scoreResult);

  calculateResult();

  controlsSection.appendChild(restartButton);
  controlsSection.appendChild(showAnswersButton);
  quizContainer.appendChild(controlsSection);
}

/* ---------- CALCULATE RESULT IN % ---------- */

function calculateResult(): void {
  let resultPercentage = (score / questions.length) * 100; // Calculate percentage of result

  // Result message
  const resultMessage: HTMLParagraphElement = document.createElement("p");
  resultMessage.classList.add("result-message");

  if (resultPercentage < 30) {
    resultMessage.innerText =
      "Ouch! Try again, " + usernameInput.value + "!";
  }
  if (resultPercentage >= 30 && resultPercentage <= 50) {
    resultMessage.innerText = "There is room for improvement, " + usernameInput.value + "!";
  }
  if (resultPercentage > 50) {
    resultMessage.innerText =
      "Wow! You are really good, " + usernameInput.value + "!";
  }
  if (resultPercentage === 100) {
    resultMessage.innerText = "Quizmaster " + usernameInput.value + "!";
  }

  quizContainer.appendChild(resultMessage);
}

/* ---------- SHOW ALL ANSWERED QUESTIONS ---------- */

function showAllAnsweredQuestions(): void {
  main.classList.remove("main-questions"); // Remove class to style main
  main.classList.add("main-answers"); // Add class to style main

  quizContainer.innerHTML = ""; // Empty container
  quizContainer.classList.remove("quiz-container-flex-center"); // Remove class to style container
  quizContainer.classList.add("quiz-container-flex-left"); // Add class to style container

  // Create div for each answered question
  userAnswers.forEach((userAnswer) => {
    const questionContainer: HTMLDivElement = document.createElement("div");
    questionContainer.classList.add("question-container");

    // Show each question
    const questionText: HTMLParagraphElement = document.createElement("p");
    questionText.classList.add("question-text");
    questionText.innerText = userAnswer.question;
    questionContainer.appendChild(questionText);

    // Show each answer
    userAnswer.answers.forEach((answer) => {
      const answerText: HTMLParagraphElement = document.createElement("p");
      answerText.classList.add("answer-text");
      answerText.innerText = answer;

      // Check answers if correct or incorrect + add style
      if (answer === userAnswer.correctAnswer) {
        answerText.classList.add("correct");
      }
      if (answer === userAnswer.userAnswer) {
        if (userAnswer.isCorrect) {
          answerText.classList.add("correct");
        } else {
          answerText.classList.add("incorrect");
        }
      }

      questionContainer.appendChild(answerText);
    });

    quizContainer.appendChild(questionContainer);
  });

  // Button to go back to results
  const backButton: HTMLButtonElement = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.innerText = "Back to results";
  backButton.addEventListener("click", showResult);
  quizContainer.appendChild(backButton);
}