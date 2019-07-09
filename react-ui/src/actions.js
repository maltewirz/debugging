import axios from './axios';

export async function getTestData() {
    let { data } = await axios.get('/api/testdata');
    return {
        type: "GET_TEST_DATA",
        testdata: data
    };
}
