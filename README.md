# Quiz App

Quiz application with questions on the topic of web development, created with HTML, TypeScript, and Tailwind CSS.

## Table of contents

- [About the project](#about-the-project)
- [Technologies used](#technologies-used)
- [Installation and execution](#installation-and-execution)
- [Project structure](#project-structure)
- [Functionality](#functionality)
- [Customization](#customization)

## About the project

This quiz app presents the user with a series of multiple-choice questions. The questions are selected randomly, and the answers are also displayed in a mixed order. The user can only answer each question once. At the beginning the name must be entered and at the end of the quiz a score and a personal message are displayed. Additionally, all answered questions can be reviewed as well as correct or incorrect answers can be compared. It is also possible to add your own questions to the quiz.

## Technologies used

- HTML
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)

## Installation and execution

1. **Clone the project:**

   ```bash
   git clone https://github.com/christina-sfmn/quizapp.git
   cd quizapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This application does not use additional dependencies outside of Tailwind CSS and TypeScript. Ensure that the Tailwind CSS file and TypeScript are present in the project.

3. **Run the project:**

   Open the index.html file in your preferred web browser.

## Project structure

```bash
quizapp/
│
├── src
│   ├── index.html
│   ├── input.css
│   ├── output.css
│   ├── script.js
│   ├── script.ts
├── .gitignore
├── package-lock.json
├── package.jsson
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

**Relevant files:**

- index.html: The main HTML file that defines the structure of the application.
- input.css: Custom CSS styles.
- output.css: Tailwind CSS file.
- script.js: Automatically generated JavaScript file.
- script.ts: TypeScript file containing the logic of the quiz app.
- README.md: This file.

## Functionality

- The questions and answers are stored in an array.
- Before starting the username must be entered, followed by a short message.
- There is the possibility to add your own questions before starting the quiz.
- At the start of the quiz the questions are shuffled randomly.
- Each question is displayed with multiple answer choices, which are also shuffled.
- Each new question page includes a progress bar indicating how many questions are left.
- After the user selects an answer it is checked for correctness and the score is updated accordingly.
- Correctly answered questions are highlighted in green. Incorrectly answered questions are highlighted in red.
- The user can only proceed to the next question after answering the current question.
- At the end of the quiz the total score is displayed. Additionally, the achieved points are converted into a percentage and a corresponding message is shown.
- The user can review all questions after finishing the quiz and compare which questions were answered correctly and which incorrectly.
- There is also an option to restart the quiz.

## Customization

- **Adjust questions and answers:**
  To add new questions or modify existing ones you can edit the questions array in the script.ts file. To only temporarily add new questions to the quiz it is also possible to enter them directly via the starting screen.

- **Adjust styles**
  Tailwind CSS classes can be used in index.html or custom CSS styles can be added in the input.css file.
