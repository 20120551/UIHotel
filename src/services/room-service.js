import axios, { privateAxios } from '@lib/axios';

export const getFreeRooms = async ({ type, from, to }) => {
    const response = await axios.get(
        `/reservation/free-rooms-list?type=${type}&fromDateStr=${from}&toDateStr=${to}`)
    return response?.data;
}

export const getRoomDetail = async ({ id }) => {
    const response = await axios.get(
        `/room/detail?id=${id}`
    );
    return response?.data;
}