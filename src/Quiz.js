import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Summary } from './Summary';
import { Question } from './Question';
import { Timer } from './Timer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import './Quiz.css';
const QuizContainer = styled(Container)`
  text-align: center;
`;

const ActionButton = styled(Button)`
  padding: 5px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;
function Quiz() {
  const [timerElapsed, setTimerElaspsed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    axios.get('https://scs-interview-api.herokuapp.com/questions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  useEffect(() => {
    if(currentQuestionIndex < questions.length){
      setTimeLeft(questions[currentQuestionIndex].time)
    }
  }, [currentQuestionIndex, questions]);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      },1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setTimerElaspsed(true)
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  }, [currentQuestionIndex, timeLeft]);

  const handleOptionSelect = (option) => {
    if (!selectedOption) {
      setSelectedOption(option);

      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion.answer === option) {
        console.log("currect answer", currentQuestion.answer, option)
        setIsCorrect(true);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setIsCorrect(false);
      }
    }
    else {
      setSelectedOption('');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setIsCorrect(null);
    setTimerElaspsed(false)
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(questions[currentQuestionIndex + 1].time);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <QuizContainer>
      <Timer timeLeft={timeLeft} />
      <Box mt={4} mb={4}>
        <Typography variant="h4">SuperQuizApp</Typography>
      </Box>      
      {currentQuestionIndex < questions.length ? (
        <>
          <Question currentQuestion={currentQuestion}
            timerElapsed={timerElapsed}
            isCorrect={isCorrect}
            handleOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
          />
          <Box mt={2}>
            <ActionButton onClick={handleNextQuestion} disabled={selectedOption === ''}>
              Next Question
            </ActionButton>
          </Box>
        </>
      ) : (
        <Summary correctAnswers={correctAnswers} questionsLength={questions.length} />
      )}
    </QuizContainer>
  );
}
export default Quiz;
