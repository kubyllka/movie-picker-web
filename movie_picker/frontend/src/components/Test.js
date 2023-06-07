import React, { useState, useEffect, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Test = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const answersRef = useRef({});
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
    answersRef.current[questionId] = answer;
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
      body: JSON.stringify(requestBody),
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
    <div style={{ maxHeight: '4300px', overflow: 'auto' }}>
      <h2>Test</h2>
      {isLoading ? (
        <p>Loading questions...</p>
      ) : (
        <>
          {questions.map((question) => (
            <div key={question.question}>
              <p>{question.question}:</p>
              <RadioGroup
                name={question.question}
                onChange={(e) =>
                  handleAnswerChange(question.question, {
                    text: e.target.value,
                    tags: question.answers.find((answer) => answer.text === e.target.value).tags,
                  })
                }
              >
                {question.answers.map((answer) => (
                  <FormControlLabel
                    key={answer.text}
                    value={answer.text}
                    control={<Radio />}
                    label={answer.text}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Send'}
          </Button>
        </>
      )}
    </div>
  );
};

export default Test;
