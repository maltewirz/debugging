import React, { Component } from 'react';
// import axios from "./axios";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Bogen } from './bogen';
import Question from './components/question';
import quizQuestions from './api/quizquestions';

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: ''
    };
}

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Question content="What is fav fodd?" />
                </div>
            </BrowserRouter>
        );
    }
}
