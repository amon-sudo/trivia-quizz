import chalk from "chalk";
import { select } from "@inquirer/prompts";

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["A.Hyper Text Markup Language", "B.High Text Machine Language", "C.Hyperlink Tool Markup"],
    answer: "A.Hyper Text Markup Language"
  },
  {
    question: "Which language runs in the browser?",
    options: ["A.Java", "B.C", "C.JavaScript"],
    answer: "C.JavaScript"
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["A.var", "B.let", "C.const"],
    answer: "C.const"
  },
  {question: "Who was the first emperor of Rome?",
    options:["A.Agustus Caeser", "B.Julius Caeser", "C.Mark Anthony"],
    answer: "A.Agustus Caeser"
  },
   {question: "Who was the father of Cleopatra VII?",
    options:["A. Agustus Caeser", "B.King Ptolemy", "c.Mark Anthony"],
    answer: "B.King Ptolemy"
  }
];
const gameState = {
  score: {
    correct: 0,
    incorrect: 0
  },
  currentIndex: 0,
  timer: null
};

async function startGame() {
  console.clear();
  console.log(chalk.blue.bold("Welcome to the Trivia Game!\n"));
  startTimer();
  await askQuestion();
}
async function askQuestion() {
  if (gameState.currentIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[gameState.currentIndex];

  const userAnswer = await select({
    message: currentQuestion.question,
    choices: currentQuestion.options.map(option => ({
      name: option,
      value: option
    }))
  });

  checkAnswer(userAnswer, currentQuestion.answer);
}
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    console.log(chalk.green("✔ Correct!\n"));
    gameState.score.correct++;
  } else {
    console.log(chalk.red(`✖ Wrong! Correct answer: ${correctAnswer}\n`));
    gameState.score.incorrect++;
  }

  gameState.currentIndex++;
  askQuestion();
}
function startTimer() {
  gameState.timer = setTimeout(() => {
    console.log(chalk.red.bold("\n⏰ Time's up!"));
    endGame();
  }, 20000); 
}
function endGame() {
  clearTimeout(gameState.timer);

  console.log(chalk.blue.bold("\n📊 Game Over!"));
  console.log(chalk.green(`Correct Answers: ${gameState.score.correct}`));
  console.log(chalk.red(`Incorrect Answers: ${gameState.score.incorrect}`));

  const total = gameState.score.correct + gameState.score.incorrect;
  const percentage = Math.round((gameState.score.correct / total) * 100);

  console.log(chalk.yellow(`Score: ${percentage}%`));
  console.log(chalk.cyan("\nThanks for playing! 👋"));

  process.exit(0);
}
startGame();
