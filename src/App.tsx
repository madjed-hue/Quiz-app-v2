import { useState } from "react";
import { Difficulty, fetchQuizData, QuesttionState } from "./components/Api";
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuesttionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestion = await fetchQuizData(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //get user answer
      const answer = e.currentTarget.value;
      //check the user answer against the correct answer
      const correct = questions[number].correct_answer === answer;
      //increase score if answer correct
      if (correct) setScore((prev) => prev + 1);
      //save answer in user answers array
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    //move to the next question and check if not the last one
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!gameOver && <p className="score">Score : {score}</p>}
        {loading && <p>Loading Questions....</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next
            </button>
          )}
      </Wrapper>
    </>
  );
}

export default App;
