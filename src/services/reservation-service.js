import axios from "@lib/axios";

export const getAll = async function ({ entries, page}) {
    console.log("make request to endpoint: ", `/Reservation?page?page=${page}&entries=${entries}`);
    const reservationCards = await axios.get(`/Reservation/page?page=${page}&entries=${entries}`);
    console.log(reservationCards.data);
    return reservationCards.data;
}

