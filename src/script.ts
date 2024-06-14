/* ---------- QUESTIONS + ANSWERS ---------- */

// Definition of types for questions + answers
interface Question {
  question: string;
  answer_correct: string;
  answers_incorrect: string[];
}

let questions: Question[] = [
  {
    question: "Which programming language is often used for web development?",
    answer_correct: "JavaScript",
    answers_incorrect: ["Java", "C#", "Python"],
  },
  {
    question: "Which JS Framework does exist?",
    answer_correct: "Vue JS",
    answers_incorrect: ["Angulara JS", "Init JS", "Reacter JS"],
  },
  {
    question: "Which property is used to define the font style?",
    answer_correct: "font-style",
    answers_incorrect: ["font-family", "font-size", "font-weight"],
  },
  {
    question: "What does CSS stand for?",
    answer_correct: "Cascading Style Sheet",
    answers_incorrect: [
      "Counter Strike: Source",
      "Computer Style Sheet",
      "Corrective Style Sheet",
    ],
  },
  {
    question: "What does HTML stand for?",
    answer_correct: "HyperText Markup Language",
    answers_incorrect: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Home Text Marker Language",
    ],
  },
  {
    question: "What is the purpose of the 'git' version control system?",
    answer_correct: "Version control",
    answers_incorrect: [
      "Text editing",
      "Database management",
      "Graphic design",
    ],
  },
  {
    question: "What is the correct HTML tag for the largest heading?",
    answer_correct: "<h1>",
    answers_incorrect: ["<h6>", "<heading>", "<head>"],
  },
  {
    question: "Which of these tags are table tags?",
    answer_correct: "<table><thead><td>",
    answers_incorrect: [
      "<table><body><tr>",
      "<tbody><tt><tfoot>",
      "<td><tr><te>",
    ],
  },
  {
    question: "What is the correct tag for a numbered list?",
    answer_correct: "<ol>",
    answers_incorrect: ["<ul>", "<ot>", "<orl>"],
  },
  {
    question: "What is NOT a CSS position?",
    answer_correct: "<floated>",
    answers_incorrect: ["<absolute>", "<relative>", "<fixed>"],
  },
];

// Add new questions to quiz
let addingQuestionsMode: boolean = false;
let newQuestions: Question[] = []; // Array to temporarily save new questions

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

// Hide answers section
answersSection.classList.add("hidden");

// Quiz title
const quizTitle: HTMLHeadingElement = document.createElement("h1");
quizTitle.classList.add("quiz-title");
quizTitle.innerText = "Web Development Quiz";
questionSection.appendChild(quizTitle);

// Heading for username
const usernameHeading: HTMLHeadingElement = document.createElement("h2");
usernameHeading.classList.add("username-heading");
usernameHeading.innerText = "Please enter your name";
questionSection.appendChild(usernameHeading);

// Container for username
const userContainer: HTMLDivElement = document.createElement("div");
userContainer.classList.add("user-container");

// Input field + button for username
let usernameInput: HTMLInputElement = document.createElement("input");
usernameInput.classList.add("username-input");
userContainer.appendChild(usernameInput);

const usernameSubmit: HTMLButtonElement = document.createElement("button");
usernameSubmit.classList.add("username-submit");
usernameSubmit.innerText = "Ok";
usernameSubmit.addEventListener("click", () => submitName(usernameInput));
userContainer.appendChild(usernameSubmit);

questionSection.appendChild(userContainer);

// Start button
const startButton: HTMLButtonElement = document.createElement("button");
startButton.classList.add("start-button");
startButton.innerText = "Start quiz!";
startButton.addEventListener("click", () => startQuiz());
controlsSection.appendChild(startButton);

// Button to add own questions
const addQuestionsButton: HTMLButtonElement = document.createElement("button");
addQuestionsButton.classList.add("add-questions-button");
addQuestionsButton.innerText = "Add own questions";
addQuestionsButton.addEventListener("click", () => showQuestionInput());
controlsSection.appendChild(addQuestionsButton);

/* ---------- SUBMIT NAME ---------- */

function submitName(usernameInput: HTMLInputElement): void {
  usernameHeading.innerText = ""; // Clear heading

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

/* ---------- SUBMIT OWN QUESTIONS ---------- */

function showQuestionInput(): void {
  questionSection.innerHTML = ""; // Clear question section
  controlsSection.innerHTML = ""; // Clear controls section
  addingQuestionsMode = true;

  // Container for question input
  const questionInputContainer: HTMLDivElement = document.createElement("div");
  questionInputContainer.classList.add("question-input-container");

  // Create heading + input fields for new questions + answers
  const questionInputTitle: HTMLHeadingElement = document.createElement("h2");
  questionInputTitle.classList.add("question-input-title");
  questionInputTitle.innerText = "Enter your questions";
  questionInputContainer.appendChild(questionInputTitle);

  const questionInput: HTMLInputElement = document.createElement("input");
  questionInput.classList.add("question-input-field");
  questionInput.placeholder = "Your question";
  questionInputContainer.appendChild(questionInput);

  const correctAnswerInput: HTMLInputElement = document.createElement("input");
  correctAnswerInput.classList.add("answer-input-field");
  correctAnswerInput.placeholder = "Correct answer";
  questionInputContainer.appendChild(correctAnswerInput);

  const incorrectAnswerInput1: HTMLInputElement =
    document.createElement("input");
  incorrectAnswerInput1.classList.add("answer-input-field");
  incorrectAnswerInput1.placeholder = "Incorrect answer 1";
  questionInputContainer.appendChild(incorrectAnswerInput1);

  const incorrectAnswerInput2: HTMLInputElement =
    document.createElement("input");
  incorrectAnswerInput2.classList.add("answer-input-field");
  incorrectAnswerInput2.placeholder = "Incorrect answer 2";
  questionInputContainer.appendChild(incorrectAnswerInput2);

  const incorrectAnswerInput3: HTMLInputElement =
    document.createElement("input");
  incorrectAnswerInput3.classList.add("answer-input-field");
  incorrectAnswerInput3.placeholder = "Incorrect answer 3";
  questionInputContainer.appendChild(incorrectAnswerInput3);

  // Container for buttons
  const questionInputButtonContainer: HTMLDivElement =
    document.createElement("div");
  questionInputButtonContainer.classList.add("question-input-button-container");

  // Add question button
  const addQuestionButton: HTMLButtonElement = document.createElement("button");
  addQuestionButton.classList.add("add-question-button");
  addQuestionButton.innerText = "Add question";
  addQuestionButton.addEventListener("click", () => {
    // Check if all inputs fields were filled
    if (
      questionInput.value === "" ||
      correctAnswerInput.value === "" ||
      incorrectAnswerInput1.value === "" ||
      incorrectAnswerInput2.value === "" ||
      incorrectAnswerInput3.value === ""
    ) {
      alert("Please fill out all fields!");
      return;
    }

    addNewQuestion(
      questionInput.value,
      correctAnswerInput.value,
      incorrectAnswerInput1.value,
      incorrectAnswerInput2.value,
      incorrectAnswerInput3.value
    );
    // Clear input fields
    questionInput.value = "";
    correctAnswerInput.value = "";
    incorrectAnswerInput1.value = "";
    incorrectAnswerInput2.value = "";
    incorrectAnswerInput3.value = "";
  });
  questionInputButtonContainer.appendChild(addQuestionButton);

  // Done button
  const doneButton: HTMLButtonElement = document.createElement("button");
  doneButton.classList.add("done-button");
  doneButton.innerText = "Done";
  doneButton.addEventListener("click", () => {
    addingQuestionsMode = false;
    questions = questions.concat(newQuestions); // Add new questions to question array
    newQuestions = []; // Clear new questions array
    reloadHomeScreen(); // Go back to home screen
  });
  questionInputButtonContainer.appendChild(doneButton);

  questionSection.appendChild(questionInputContainer);
  controlsSection.appendChild(questionInputButtonContainer);
}

/* ---------- ADD NEW QUESTION TO QUIZ ---------- */

// Spread operator "..." needs to be in the last position of the function; in array the spread operator can be anywhere
function addNewQuestion(
  question: string,
  answer_correct: string,
  ...answers_incorrect: string[]
): void {
  const newQuestion: Question = { question, answer_correct, answers_incorrect };
  newQuestions.push(newQuestion);
}

/* ---------- RELOAD HOME SCREEN ---------- */

function reloadHomeScreen(): void {
  questionSection.innerHTML = ""; // Clear question section
  controlsSection.innerHTML = ""; // Clear controls section

  // Rebuild home screen
  questionSection.appendChild(quizTitle);
  questionSection.appendChild(usernameHeading);
  questionSection.appendChild(userContainer);
  controlsSection.appendChild(startButton);
  controlsSection.appendChild(addQuestionsButton);
}

/* ---------- START QUIZ ---------- */

function startQuiz(): void {
  // Check if name was submitted
  if (usernameSubmit.disabled === false) {
    alert("Please submit your name!");
    return;
  }

  answersSection.classList.remove("hidden"); // Show answers section
  startButton.classList.add("hidden"); // Hide start button after quiz has started
  mixQuestions();
  displayQuestion();
}

/* ---------- MIX QUESTIONS ---------- */

function mixQuestions(): void {
  // Create 2 random numbers between 1 & 0 and substract them from each other -> to get positive or negative number als result; result is negative or 0 = order stays the same; result is positive = order is changes -> elements get mixed
  mixedQuestions = questions.sort(() => Math.random() - Math.random());
}

/* ---------- DISPLAY QUESTIONS ---------- */

function displayQuestion(): void {
  questionSection.innerHTML = ""; // Clear questions section
  controlsSection.innerHTML = ""; // Clear controls section
  questionAnswered = false; // Reset question status

  // Check if index is lower than total number of questions
  if (currentQuestionIndex < mixedQuestions.length) {
    currentQuestion = mixedQuestions[currentQuestionIndex];

    const questionText: HTMLHeadingElement = document.createElement("h2");
    questionText.classList.add("question");
    questionText.innerText = currentQuestion.question;
    questionSection.appendChild(questionText);

    // Save all answers in new array; "..." = spread operator -> divides array into its elements
    // Spread operator "..." in array can be in first or last position; see function "addNewQuestion" -> in function it has to be in last position
    answers = [
      currentQuestion.answer_correct,
      ...currentQuestion.answers_incorrect,
    ];
    answers = answers.sort(() => Math.random() - Math.random()); // Mix answers the same way like questions above

    answersSection.innerHTML = ""; // Clear answers section

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

  // Check if answer is correct or incorrect
  const correctAnswer = answer === currentQuestion.answer_correct;
  if (correctAnswer) {
    answerButton.classList.add("correct");
    score += 1; // Add 1 point to score
  } else {
    answerButton.classList.add("incorrect");
  }

  // Save user answer to array
  userAnswers.push({
    question: currentQuestion.question,
    answers: [
      currentQuestion.answer_correct,
      ...currentQuestion.answers_incorrect,
    ],
    correctAnswer: currentQuestion.answer_correct,
    userAnswer: answer,
    isCorrect: correctAnswer,
  });
}

/* ---------- SHOW RESULT ---------- */

function showResult(): void {
  main.classList.remove("main-answers"); // Remove class to style main
  main.classList.add("main-questions"); // Add class to style main

  quizContainer.innerHTML = ""; // Clear container
  quizContainer.classList.remove("quiz-container-flex-left"); // Remove class to style container
  quizContainer.classList.add("quiz-container-flex-center"); // Add class to style container

  controlsSection.innerHTML = ""; // Clear controls section to remove "next"-button

  // Create elements for score + reset
  const scoreTitle: HTMLHeadingElement = document.createElement("h2");
  scoreTitle.classList.add("score-title");
  scoreTitle.innerText = "Your final score:";
  quizContainer.appendChild(scoreTitle);

  const scoreResult: HTMLHeadingElement = document.createElement("h2");
  scoreResult.classList.add("score-result");
  scoreResult.innerHTML = `${score} / <span>${questions.length}</span>`;
  quizContainer.appendChild(scoreResult);

  const restartButton: HTMLButtonElement = document.createElement("button");
  restartButton.classList.add("restart-button");
  restartButton.innerText = "restart quiz";
  restartButton.addEventListener("click", () => location.reload());
  controlsSection.appendChild(restartButton);

  const showAnswersButton: HTMLButtonElement = document.createElement("button");
  showAnswersButton.classList.add("show-answers-button");
  showAnswersButton.innerText = "Check questions";
  showAnswersButton.addEventListener("click", showAllAnsweredQuestions);
  controlsSection.appendChild(showAnswersButton);

  calculateResult();

  quizContainer.appendChild(controlsSection);

}

/* ---------- CALCULATE RESULT IN % ---------- */

function calculateResult(): void {
  let resultPercentage = (score / questions.length) * 100; // Calculate percentage of result

  // Result message
  const resultMessage: HTMLParagraphElement = document.createElement("p");
  resultMessage.classList.add("result-message");

  if (resultPercentage < 30) {
    resultMessage.innerText = "Ouch! Try again, " + usernameInput.value + "!";
  }
  if (resultPercentage >= 30 && resultPercentage <= 50) {
    resultMessage.innerText =
      "There is room for improvement, " + usernameInput.value + "!";
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

  quizContainer.innerHTML = ""; // Clear container
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
          answerText.classList.add("user-correct");
        } else {
          answerText.classList.add("user-incorrect");
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