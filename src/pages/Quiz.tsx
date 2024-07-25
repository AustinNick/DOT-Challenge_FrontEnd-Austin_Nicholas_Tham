// src/components/QuizPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../apis';
import Timer from './Timer';

const QuizPage = ({ category, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      const fetchedQuestions = await fetchQuestions(category, difficulty);
      setQuestions(fetchedQuestions);
    };
    getQuestions();
  }, [category, difficulty]);

  const handleAnswer = (answer) => {
    if (questions[currentQuestionIndex].correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimeUp = () => {
    setQuizCompleted(true);
  };

  useEffect(() => {
    if (quizCompleted) {
      navigate('/results', { state: { correctAnswers, wrongAnswers, totalQuestions: questions.length } });
    }
  }, [quizCompleted, correctAnswers, wrongAnswers, questions.length, navigate]);

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <Timer duration={300} onTimeUp={handleTimeUp} />
      <div>
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{questions[currentQuestionIndex].question}</p>
        {questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer).map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
