export function reducer(state = {}, action) {

    if (action.type === 'GET_TEST_DATA') {
        return { ...state,
        testdata: action.testdata};
    }

    return state;
}
