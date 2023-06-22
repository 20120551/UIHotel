import axios from '@lib/axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('/auth/login', {
            username,
            password
        })
        return response?.data;
    } catch (err) {
        // do something with err
        throw err;
    }
}