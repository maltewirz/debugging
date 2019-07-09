import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
    return (
        <div className="result">
            You have {props.quizResultPoints} points!
            The topics are {props.quizResultTopics}!
        </div>
    );
}

Result.propTypes = {
    quizResultPoints: PropTypes.number.isRequired,
    quizResultTopics: PropTypes.array.isRequired
};

export default Result;
