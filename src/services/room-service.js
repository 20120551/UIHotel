import { privateAxios } from '@lib/axios';

export const getFreeRooms = async ({ type, from, to }) => {
    const response = await privateAxios.get(
        `/reservation/free-rooms-list?type=${type}&fromDateStr=${from}&toDateStr=${to}`)
    return response?.data;
}