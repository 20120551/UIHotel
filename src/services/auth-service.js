import axios, { privateAxios } from '@lib/axios';

export const login = async ({ username, password }) => {
    const response = await axios.post('/user/login', {
        username,
        password
    })
    return response?.data;
}

export const profile = async () => {
    const response = await privateAxios.get('/user/profile')
    return response?.data;
}