import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/question';
import QuestionCount from '../components/questioncount';

function Quiz(props) {

    return (
        <div className="quiz">
            <QuestionCount
                counter={props.questionId}
                total={props.questionTotal}
            />
            <Question
                question={props.question}
                stateBox={props.stateBox}
                boxChecked={props.boxChecked}
                nextQuestion={props.nextQuestion}
            />
        </div>
    );
}

Quiz.propTypes = {
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    stateBox: PropTypes.bool.isRequired,
    boxChecked: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
};

export default Quiz;
