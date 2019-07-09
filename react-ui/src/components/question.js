import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
    return (
        <p className="question"> {props.question}
                <input
                    type="checkbox"
                    checked={props.stateBox}
                    onChange={props.boxChecked}
                />
                <button
                    onClick={props.nextQuestion}
                > Next </button>
        </p>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    stateBox: PropTypes.bool.isRequired,
    boxChecked: PropTypes.func.isRequired,
    nextQuestion: PropTypes.func.isRequired
}

export default Question;
