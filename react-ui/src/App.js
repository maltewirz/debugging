import React, { useEffect, useState } from 'react';
// import axios from "./axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Quiz from './components/quiz';
import Result from './components/result';
import quizQuestions from './api/quizquestions';

export function App() {

    const [counter, setCounter] = useState(1);
    const [questionId, setQuestionId] = useState(1);
    const [question, setQuestion] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [answersCount, setAnswersCount] = useState({});
    const [results, setStateResults] = useState("");

    useEffect(()=> {
        setQuestion(quizQuestions[0].question);
        setAnswerOptions(quizQuestions[0].answers);
    },[]);

    function handleAnswerSelected(event) {
        setUserAnswer(event.currentTarget.value);
        if (questionId < quizQuestions.length) {
            setTimeout(() => setNextQuestion(), 300);
        } else {
            setTimeout(() => setResults(getResults()), 300);
        }
    }

    function setResults(result) {
        if (result.length === 1) {
            setStateResults(result[0]);
        } else {
            setStateResults("Undetermined");
        }
    }

    function getResults() {
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    function setUserAnswer(answer) {
        setAnswersCount(() => {
            return {
                ...answersCount,
                [answer]: (answersCount[answer] || 0) + 1
            };
        });
        setAnswer(answer);
    }

    function setNextQuestion() {
        setCounter(counter + 1);
        setQuestionId(questionId + 1);
        setQuestion(quizQuestions[counter].question);
        setAnswerOptions(quizQuestions[counter].answers);
        setAnswer("");
    }

    function renderQuiz() {
        return (
            <Quiz
                answer={answer}
                answerOptions={answerOptions}
                questionId={questionId}
                question={question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={handleAnswerSelected}
            />
        );
    }

    function renderResult() {
        return (
            <Result
                quizResult={results}
            />
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                <div className="header">
                    <Link to="/"> Start </Link>
                    <Link to="/question"> Question </Link>
                    <Link to="/bogen"> bogen </Link>
                    <a href="/logout"> Logout </a>
                </div>

                <div className="content">
                    <Route path="/question" render={() => (
                        results ? renderResult() : renderQuiz()
                    )} />

                    <Route path="/bogen" component={Bogen} />
                </div>
            </div>
        </BrowserRouter>
    );
}
