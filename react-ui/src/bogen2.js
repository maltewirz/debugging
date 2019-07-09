import React, {useEffect} from 'react';
import { connect } from 'react-redux';
// import axios from './axios';
import { getTestData } from './actions';

export function Bogen(props) {

    useEffect(() => {
        props.dispatch(getTestData());
    },[]);

    if (!props.testdata) {
        return <div> Loading </div>;

    }

    return (
        <div> Bogen content
        {props.testdata.length >= 0 && props.testdata}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        testdata: state.testdata
    };
};

export default connect(mapStateToProps)(Bogen);
