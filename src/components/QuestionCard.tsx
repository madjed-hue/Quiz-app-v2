import React from "react";
import { answerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: answerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <div>
        <p className="number">
          Question : {questionNr} / {totalQuestions}
        </p>
        <p>{answers} </p>
        <div>
          {answers.map((answer) => (
            <div key={answer}>
              <ButtonWrapper
                disabled={!!userAnswer}
                value={answer}
                onClick={callback}
              >
                <span> {answer} </span>
              </ButtonWrapper>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
