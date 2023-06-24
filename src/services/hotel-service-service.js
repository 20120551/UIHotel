import { privateAxios } from '@lib/axios';

export const getServiceByCategory = async ({ categoryId }) => {
    const response = await privateAxios.get(`/service/search?category=${categoryId}`)
    return response?.data;
}