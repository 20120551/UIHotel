import { createPrivateAxios } from "@lib/axios";

export const getAll = async function ({ take, page, status }) {
    console.log("make request to endpoint: ", `/invoice?take=${take}&page=${page}&status=${status}`);
    const invoices = await createPrivateAxios().get(`/invoice?take=${take}&page=${page}&status=${status}`);
    return invoices.data;
}

export const getDetail = async function ({ index }) {
    console.log("make request to endpoint: ", `invoice/${index}`);
    const invoice = await createPrivateAxios().get(`invoice/${index}`);
    return invoice.data;
}

export const getPayDetail = async function ({ index }) {
    console.log("make request to endpoint: ", `invoice/calculate/${index}`);
    const invoice = await createPrivateAxios().get(`invoice/calculate/${index}`);
    return invoice.data;
}

export const addReservationCard = async function (payload) {
    const invoice = await createPrivateAxios().post(`reservation/change-room`, {
        ...payload
    });
    return invoice.data;
}

export const addHotelService = async function ({ invoiceId, serviceId }) {
    const invoice = await createPrivateAxios().post(`/invoice/${invoiceId}/service/${serviceId}`);
    return invoice.data;
}

export const updateInvoiceStatus = async function ({ invoiceId }) {
    const invoice = await createPrivateAxios().put(`/invoice/${invoiceId}`);
    return invoice.data;
}

export const deleteInvoice = async function ({ invoiceId }) {
    const invoice = await createPrivateAxios().delete(`/invoice/${invoiceId}`);
    return invoice.data;
}