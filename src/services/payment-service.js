import axios from "@lib/axios"

export const createPayment = async (invoiceId, payload) => {
    const response = await axios.post(`/payment/${invoiceId}`, payload);
    return response?.data;
}

export const getPaymentStatus = async (paymentId) => {
    const response = await axios.get(`/payment/${paymentId}`);
    return response?.data;
}