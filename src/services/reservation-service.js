import axios from "@lib/axios";

export const getAll = async function ({ entries, page}) {
    console.log("make request to endpoint: ", `/Reservation?page?page=${page}&entries=${entries}`);
    const reservationCards = await axios.get(`/Reservation/page?page=${page}&entries=${entries}`);
    return reservationCards.data;
}

export const getByInvoiceId = async function (id) {
    console.log("make request to endpoint: ", `/Reservation/by-card-invoice-id?id=${id}`);
    const reservationCards = await axios.get(`/Reservation/by-card-invoice-id?id=${id}`);
    return reservationCards.data;
}

export const getByReservationCardId = async function (id) {
    console.log("make request to endpoint: ", `/Reservation/by-card-id?id=${id}`);
    const reservationCards = await axios.get(`/Reservation/by-card-id?id=${id}`);
    return [reservationCards.data];
}

export const getByReservationByPeriodTime = async function ({from, to}) {
    console.log("make request to endpoint: ", `/Reservation/by-period-time?From=${from}&To=${to}`);
    const reservationCards = await axios.get(`/Reservation/by-period-time?From=${from}&To=${to}`);
    return reservationCards.data;
}

export const getTotalPage = async function ({ entries, page}) {
    console.log("make request to endpoint: ", `/Reservation/total-page?page=${page}&entries=${entries}`);
    const reservationCards = await axios.get(`/Reservation/total-page?page=${page}&entries=${entries}`);
    return reservationCards.data;
}