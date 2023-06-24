import { invoice } from "@constant";

export const getAllInvoice = payload => ({
    type: invoice.GET_ALL_INVOICE,
    payload
})

export const getInvoice = payload => ({
    type: invoice.GET_INVOICE,
    payload
})

export const addReservationCard = payload => ({
    type: invoice.ADD_RESERVATION_CARD,
    payload
})

export const addHotelService = payload => ({
    type: invoice.ADD_HOTEL_SERVICE,
    payload
})

export const updateInvoiceStatus = payload => ({
    type: invoice.UPDATE_INVOICE_STATUS,
    payload
})

