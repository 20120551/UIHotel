import { privateAxio, createPrivateAxios } from '@lib/axios';

export const getServiceByCategory = async ({ categoryId }) => {
    const response = await createPrivateAxios().get(`/service/search?category=${categoryId}`)
    return response?.data;
}