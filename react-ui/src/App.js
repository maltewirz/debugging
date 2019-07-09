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
        console.log("resultCache", this.state.resultCache);
        const resultTopics = Object.keys(this.state.resultCache);
        const resultPoints = Object.values(this.state.resultCache);
        let points = 0;
        for (let e of resultPoints) {
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

    //in state just the things
    // everything else store in attach to the component itself. this.resultcache = Object
    // then just add porpeterties to it.
    setNextQuestion() {
        if (this.state.boxStateValue === true) {
            this.setState((state, props) => ({
                resultCache: {
                    ...state.resultCache,
                    [this.state.question]: questionData[this.state.questionId].points
                } //this is not working for some reason
            })
            ,  () => {
                console.log("state in function", this.state);
            }
            );
        }

        if (this.state.questionId === questionData.length) {
            //extract data from state, pass it as var to final

            // this.getFinalResults();  //pass to it the data
        } else {
            this.setState({
                questionId: this.state.questionId +1 ,
                counter: this.state.counter +1,
                question: questionData[this.state.counter + 1].question,
                boxStateValue: false
            });
        }
        // } else { // do this regardless of the questionid, then do the rest
        //
        // }
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
