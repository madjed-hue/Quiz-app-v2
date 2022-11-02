import { shuffleArray } from "./Utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Questions = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuesttionState = Questions & { answers: string[] };

export const fetchQuizData = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=32&type=multiple&difficulty=${difficulty}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Questions) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
