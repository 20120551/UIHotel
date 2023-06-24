import axios from '@lib/axios';

export const login = async (username, password) => {
    const response = await axios.post('/auth/login', {
        username,
        password
    })
    return response?.data;
}