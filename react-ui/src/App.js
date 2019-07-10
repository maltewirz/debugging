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
              finalResultPoints: 0,
              finalResultTopics: 0,
              resultCache: {},
              resultSuccess: false
        };
        this.setNextQuestion = this.setNextQuestion.bind(this);
        this.onBoxSelected = this.onBoxSelected.bind(this);
        this.testingObj = {};
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
        console.log("this.state.resultCache",this.state.resultCache);
        console.log("this.testingObj", this.testingObj);
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
            resultSuccess:true,
            finalResultPoints: points,
            finalResultTopics: resultTopics
        });
    }

    checkIfFinalQuestion() {
        if (this.state.questionId === questionData.length) {
            this.getFinalResults();
        } else {
            this.setState({
                questionId: this.state.questionId +1 ,
                counter: this.state.counter +1,
                question: questionData[this.state.counter + 1].question,
                boxStateValue: false
            });
        }
    }

    setNextQuestion() {
        if (this.state.boxStateValue === true) {
            this.setState((state, props) => ({
                    resultCache: {
                        ...state.resultCache,
                        [this.state.question]: questionData[this.state.counter].points
                    }
                }), () => {
                    this.checkIfFinalQuestion();
                });
        } else {
            this.checkIfFinalQuestion();
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
        return (
            <BrowserRouter>
                <div className="App">
                { this.state.resultSuccess
 ? this.renderResult() : this.renderQuiz()}
                </div>
            </BrowserRouter>
        );
    }
}
