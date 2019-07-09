import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Quiz from './components/quiz';
import Result from './components/result'
import questionData from './api/questiondata';

export class App extends Component {

    constructor(props) {
            super(props);

            this.state = {
                counter: 0,
              questionId: 1,
              question: '',
              boxStateValue: false,
              resultCache: {},
              finalResultPoints: 0,
              finalResultTopics: 0
        };
        this.setNextQuestion = this.setNextQuestion.bind(this);
        this.onBoxSelected = this.onBoxSelected.bind(this);
    }

    componentDidMount() {
        this.setState({
          question: questionData[0].question,
        });
    }

    onBoxSelected(event) {
        if (event.target.checked === true) {
            this.setState({ boxStateValue: true});
        } else {
            this.setState({ boxStateValue: false});
        }
    }

    getFinalResults() {
        const resultTopics = Object.keys(this.state.resultCache);
        const resultPoints = Object.values(this.state.resultCache);
        let points = 0;
        for (let e in resultPoints) {
            points += resultPoints[e];
        }
        if (points <= 1) {
            console.log("keine");
        } else if (points <= 2) {
            console.log("geringe");
        } else if (points <= 4) {
            console.log("mittlere");
        } else if (points > 4) {
            console.log("hohe");
        }

        this.setState({
            finalResultPoints: points,
            finalResultTopics: resultTopics
        });
    }

    setNextQuestion() {
        console.log("questionData.length", questionData.length);
        console.log("this.state.questionId", this.state.questionId);
        if (this.state.questionId === questionData.length) {
            this.getFinalResults();
        } else {
            if (this.state.boxStateValue === true) {
                this.setState((state, props) => ({
                    resultCache: {
                        ...state.resultCache,
                        [this.state.question]: questionData[this.state.questionId].points
                    }
                }));
            }
            this.setState({ // here might be issue with questionsid counter
                questionId: this.state.questionId + 1,
                question: questionData[this.state.questionId].question,
                boxStateValue: false
            });
        }
    }

    renderQuiz() {
        return(
            <Quiz
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={questionData.length}
                stateBox={this.state.boxStateValue}
                boxChecked={this.onBoxSelected}
                nextQuestion={this.setNextQuestion}
            />
        );
    }

    renderResult() {
        return (
            <Result
                quizResultPoints={this.state.finalResultPoints}
                quizResultTopics={this.state.finalResultTopics}
            />
        );
    }

    render() {
        console.log(this.state);
        console.log("finalResultPoints?", this.state.finalResultPoints);
        return (
            <BrowserRouter>
                <div className="App">
                {this.state.finalResultPoints ? this.renderResult() : this.renderQuiz()}
                </div>
            </BrowserRouter>
        );
    }
}
