import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const answersRef = useRef({}); // Використовуємо useRef замість useState для збереження стану відповідей
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/static/json/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setIsLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    answersRef.current[questionId] = answer; // Зберігаємо відповідь у поточному значенні answersRef.current
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const tags = Object.values(answersRef.current).reduce(
      (allTags, answer) => allTags.concat(answer.tags),
      []
    );
    const requestBody = { answers: answersRef.current, tags };

    fetch('http://127.0.0.1:8000/api/submit-test/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // Відправляємо requestBody як JSON-рядок
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Тест</h2>
      {isLoading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          {questions.map((question) => (
            <div key={question.question}>
              <label htmlFor={question.question}>{question.question}:</label>
              <select
                id={question.question}
                onChange={(e) => handleAnswerChange(question.question, e.target.value)}
              >
                <option value="">Select an answer</option>
                {question.answers.map((answer) => (
                  <option key={answer.text} value={answer.text}>
                    {answer.text}
                  </option>
                ))}
              </select>
            </div>
          ))}
           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Send'}
          </Button>
        </>
      )}
    </div>
  );
};

export default Test;
