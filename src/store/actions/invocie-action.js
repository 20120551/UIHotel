import { invoice } from "@constant";

export const getAllInvoice = payload => ({
    action: invoice.GET_ALL_INVOICE,
    payload
})

export const getInvoice = payload => ({
    action: invoice.GET_INVOICE,
    payload
})

export const addReservationCard = payload => ({
    action: invoice.ADD_RESERVATION_CARD,
    payload
})

export const addHotelService = payload => ({
    action: invoice.ADD_HOTEL_SERVICE,
    payload
})

export const updateInvoiceStatus = payload => ({
    action: invoice.UPDATE_INVOICE_STATUS,
    payload
})

